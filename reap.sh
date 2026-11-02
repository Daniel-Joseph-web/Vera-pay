#!/usr/bin/env bash
# ==============================================================================
# Verapay Code Reaper / Harvester (Bash / Git Bash / WSL / macOS / Linux)
# ==============================================================================

set -euo pipefail

TARGET="${1:-both}"
OUTFILE="${2:-}"
WORKSPACE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# If running on Windows with powershell.exe available, delegate to reap.ps1
if command -v powershell.exe >/dev/null 2>&1; then
  WIN_DIR="$(cd "$WORKSPACE_ROOT" && pwd -W 2>/dev/null || pwd)"
  powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "$WIN_DIR\\reap.ps1" "$@"
  exit $?
fi

banner() {
  echo ""
  echo "=========================================================="
  echo "             VERAPAY CODE REAPER / GATHERER               "
  echo "=========================================================="
}

show_help() {
  banner
  echo "Usage:"
  echo "  ./reap.sh [frontend | backend | both] [output_file]"
  echo ""
  echo "Commands:"
  echo "  frontend   Gather all frontend source files into a file"
  echo "  backend    Gather all backend source files into a file"
  echo "  both       Gather frontend, backend, and shared files (default)"
  echo "  help       Display this usage message"
  echo ""
  echo "Default Output Files:"
  echo "  frontend -> frontend_gathered.txt"
  echo "  backend  -> backend_gathered.txt"
  echo "  both     -> codebase_gathered.txt"
  echo "=========================================================="
  echo ""
}

gather_codebase() {
  local target_name="$1"
  local dest_file="$2"
  shift 2
  local src_dirs=("$@")

  echo ""
  echo "[*] Scanning directories for $target_name: (${src_dirs[*]})..."

  local target_path="$WORKSPACE_ROOT/$dest_file"
  local timestamp
  timestamp="$(date '+%Y-%m-%d %H:%M:%S')"

  # Collect files excluding node_modules, .next, dist, lockfiles, .env
  local -a files=()
  for dir in "${src_dirs[@]}"; do
    if [ -d "$WORKSPACE_ROOT/$dir" ]; then
      while IFS= read -r -d '' file; do
        files+=("$file")
      done < <(find "$WORKSPACE_ROOT/$dir" \
        -type d \( -name "node_modules" -o -name ".next" -o -name "dist" -o -name "build" -o -name ".git" \) -prune -o \
        -type f \( \
          -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" -o \
          -name "*.json" -o -name "*.css" -o -name "*.scss" -o -name "*.html" -o \
          -name "*.prisma" -o -name "*.sql" -o -name "*.md" -o -name ".env.example" \
        \) \
        ! -name "package-lock.json" ! -name "yarn.lock" ! -name "pnpm-lock.yaml" \
        ! -name ".env" ! -name ".env.local" ! -name ".env.production" \
        -print0 | sort -z)
    fi
  done

  local total_files="${#files[@]}"
  if [ "$total_files" -eq 0 ]; then
    echo " [!] No files found for $target_name!"
    return 1
  fi

  echo "  Found $total_files file(s) to gather."

  mkdir -p "$(dirname "$target_path")"
  {
    echo "================================================================================"
    echo "VERAPAY CODE REAPER HARVEST: $target_name"
    echo "Generated:   $timestamp"
    echo "Source(s):   ${src_dirs[*]}"
    echo "Total Files: $total_files"
    echo "================================================================================"
    echo ""
    echo "TABLE OF CONTENTS:"
    local idx=1
    for f in "${files[@]}"; do
      local rel="${f#"$WORKSPACE_ROOT/"}"
      local size_bytes
      size_bytes=$(wc -c < "$f")
      local size_kb
      size_kb=$(awk "BEGIN {printf \"%.2f\", $size_bytes/1024}")
      printf "  %3d. %s (%s KB)\n" "$idx" "$rel" "$size_kb"
      idx=$((idx + 1))
    done

    echo ""
    echo "================================================================================"
    echo "FILE CONTENTS"
    echo "================================================================================"
    echo ""

    local current=1
    for f in "${files[@]}"; do
      local rel="${f#"$WORKSPACE_ROOT/"}"
      local lines
      lines=$(wc -l < "$f")
      local bytes
      bytes=$(wc -c < "$f")
      echo "================================================================================"
      echo "FILE [$current/$total_files]: $rel"
      echo "Lines: $lines | Size: $bytes bytes"
      echo "================================================================================"
      cat "$f"
      echo ""
      echo "--------------------------------------------------------------------------------"
      echo "END OF FILE: $rel"
      echo "--------------------------------------------------------------------------------"
      echo ""
      current=$((current + 1))
    done
  } > "$target_path"

  echo ""
  echo "=========================================================="
  echo " [OK] SUCCESS! Gathered $target_name into single file."
  echo "=========================================================="
  echo "  Destination : $target_path"
  echo "  Files       : $total_files"
  echo "=========================================================="
  echo ""
}

case "$TARGET" in
  -h|--help|help|\?)
    show_help
    exit 0
    ;;
  frontend|fe|front|ui|client|next)
    banner
    dest="${OUTFILE:-frontend_gathered.txt}"
    gather_codebase "Frontend" "$dest" "frontend"
    ;;
  backend|be|back|server|api|express)
    banner
    dest="${OUTFILE:-backend_gathered.txt}"
    gather_codebase "Backend" "$dest" "backend"
    ;;
  both|all|everything|codebase|full)
    banner
    dest="${OUTFILE:-codebase_gathered.txt}"
    gather_codebase "Frontend, Backend & Shared Codebase" "$dest" "frontend" "backend" "shared"
    ;;
  *)
    banner
    echo " [!] Invalid argument: '$TARGET'"
    show_help
    exit 1
    ;;
esac
