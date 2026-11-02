import os
import re
import subprocess
from markdown_it import MarkdownIt

CSS_TEMPLATE = """
  @page {
    size: A4;
    margin: 16mm 14mm 16mm 14mm;
  }
  
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    color: #2D3748;
    background-color: #FFFFFF;
    line-height: 1.45;
    font-size: 8.8pt;
    margin: 0;
    padding: 0;
  }

  /* Document Banner */
  .doc-header {
    border-bottom: 2px solid #007A5E;
    padding-bottom: 8px;
    margin-bottom: 12px;
  }

  .doc-title {
    font-size: 20pt;
    font-weight: 800;
    color: #007A5E;
    margin: 0 0 2px 0;
    letter-spacing: -0.4px;
  }

  .doc-tagline {
    font-size: 10pt;
    font-weight: 600;
    color: #4A5568;
    margin: 0 0 4px 0;
  }

  .doc-subtitle {
    font-size: 8pt;
    color: #718096;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Headings */
  h1 {
    color: #007A5E;
    font-size: 16pt;
    font-weight: 800;
    margin-top: 16px;
    margin-bottom: 8px;
    padding-bottom: 4px;
    border-bottom: 2px solid #007A5E;
    page-break-after: avoid;
  }

  h2 {
    color: #006644;
    font-size: 12pt;
    font-weight: 700;
    margin-top: 14px;
    margin-bottom: 6px;
    padding-bottom: 3px;
    border-bottom: 1.5px solid #E2E8F0;
    page-break-after: avoid;
  }

  h3 {
    color: #2D3748;
    font-size: 9.8pt;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 4px;
    page-break-after: avoid;
  }

  h4 {
    color: #334155;
    font-size: 9pt;
    font-weight: 700;
    margin-top: 8px;
    margin-bottom: 3px;
    page-break-after: avoid;
  }

  p {
    margin: 0 0 6px 0;
  }

  ul, ol {
    margin: 0 0 6px 0;
    padding-left: 18px;
  }

  li {
    margin-bottom: 3px;
  }

  hr {
    border: none;
    border-top: 1px solid #E2E8F0;
    margin: 12px 0;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
    font-size: 8.2pt;
    page-break-inside: auto;
  }

  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }

  th {
    background-color: #006644;
    color: #FFFFFF;
    font-weight: 600;
    text-align: left;
    padding: 5px 8px;
    border: 1px solid #00593c;
  }

  td {
    padding: 5px 8px;
    border: 1px solid #E2E8F0;
    vertical-align: top;
  }

  tr:nth-child(even) td {
    background-color: #F8FAFC;
  }

  /* Code Blocks */
  pre {
    background-color: #0F172A;
    color: #F8FAFC;
    padding: 9px 12px;
    border-radius: 5px;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 7.8pt;
    line-height: 1.4;
    overflow-x: auto;
    margin: 6px 0 10px 0;
    border: 1px solid #1E293B;
    page-break-inside: avoid;
  }

  code {
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 8pt;
  }

  p code, li code, td code {
    background-color: #F1F5F9;
    color: #0F766E;
    padding: 1px 4px;
    border-radius: 3px;
    border: 1px solid #E2E8F0;
    font-weight: 600;
  }

  /* Callouts & Quotes */
  blockquote {
    border-left: 3.5px solid #007A5E;
    background-color: #F0FDF4;
    padding: 6px 10px;
    margin: 6px 0 8px 0;
    color: #166534;
    font-size: 8.5pt;
    page-break-inside: avoid;
  }

  /* Badges */
  .badge {
    display: inline-block;
    padding: 1px 6px;
    border-radius: 3px;
    font-weight: 700;
    font-size: 7.5pt;
  }
  .badge-green { background-color: #DCFCE7; color: #15803D; border: 1px solid #BBF7D0; }
  .badge-amber { background-color: #FEF3C7; color: #B45309; border: 1px solid #FDE68A; }
  .badge-red { background-color: #FEE2E2; color: #B91C1C; border: 1px solid #FECACA; }
"""

def render_markdown_file(md_path, html_output_path, doc_title, doc_category):
    with open(md_path, "r", encoding="utf-8") as f:
        md_content = f.read()

    # Pre-process markdown: replace mermaid blocks with formatted pre tags so they render cleanly
    md_content = re.sub(
        r"```mermaid\n(.*?)\n```",
        r'<pre style="background: #F8FAFC; color: #0F766E; border: 1px solid #CBD5E1; padding: 10px; font-weight: 600; font-size: 7.5pt;">\1</pre>',
        md_content,
        flags=re.DOTALL
    )

    md = MarkdownIt('commonmark', {'linkify': False}).enable('table').enable('strikethrough')
    rendered_body = md.render(md_content)

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{doc_title}</title>
<style>
{CSS_TEMPLATE}
</style>
</head>
<body>
  <div class="doc-header">
    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <div class="doc-title">Verapay Technical Docs</div>
        <div class="doc-tagline">{doc_title}</div>
        <div class="doc-subtitle">{doc_category} &bull; Version 2.0</div>
      </div>
      <div style="text-align: right; font-size: 8pt; color: #718096;">
        <div><strong>Verapay Platform</strong></div>
        <div>Verify, then release.</div>
      </div>
    </div>
  </div>

  {rendered_body}
</body>
</html>
"""

    with open(html_output_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Rendered HTML to {html_output_path}")

def compile_html_to_pdf(html_path, pdf_path, doc_header_text):
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    user_data_dir = r"c:\Users\USER\Downloads\vera-pay\temp-chrome-docs"

    header = f'<div style="font-size: 7.5pt; width: 100%; display: flex; justify-content: space-between; padding: 0 14mm; color: #718096; font-family: Segoe UI, sans-serif;"><span>Verapay &bull; {doc_header_text}</span><span>Version 2.0</span></div>'
    footer = '<div style="font-size: 7.5pt; width: 100%; display: flex; justify-content: space-between; padding: 0 14mm; color: #718096; font-family: Segoe UI, sans-serif;"><span>Verapay: Verify, then release.</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>'

    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        f"--user-data-dir={user_data_dir}",
        "--display-header-footer",
        f"--header-template={header}",
        f"--footer-template={footer}",
        f"--print-to-pdf={pdf_path}",
        html_path
    ]

    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(pdf_path):
        size_kb = os.path.getsize(pdf_path) / 1024
        print(f"SUCCESS: Generated {pdf_path} ({size_kb:.1f} KB)")
    else:
        print(f"FAILED to generate {pdf_path}. Return code: {res.returncode}")
        if res.stderr:
            print("Stderr:", res.stderr)

def main():
    workspace = r"c:\Users\USER\Downloads\vera-pay"

    tasks = [
        {
            "md": os.path.join(workspace, "Verapay_FRD.md"),
            "html": os.path.join(workspace, "Verapay_FRD.html"),
            "pdf": os.path.join(workspace, "Verapay_FRD.pdf"),
            "title": "Functional Requirements Document (FRD)",
            "category": "System Specification & Acceptance Criteria",
            "header": "Functional Requirements Document (FRD)"
        },
        {
            "md": os.path.join(workspace, "Verapay_Frontend_Docs.md"),
            "html": os.path.join(workspace, "Verapay_Frontend_Docs.html"),
            "pdf": os.path.join(workspace, "Verapay_Frontend_Docs.pdf"),
            "title": "Frontend Engineering Documentation",
            "category": "Client Architecture & Component Specs",
            "header": "Frontend Engineering Spec"
        },
        {
            "md": os.path.join(workspace, "Verapay_Backend_Docs.md"),
            "html": os.path.join(workspace, "Verapay_Backend_Docs.html"),
            "pdf": os.path.join(workspace, "Verapay_Backend_Docs.pdf"),
            "title": "Backend Engineering Documentation",
            "category": "Server Architecture, Database Schema & API Reference",
            "header": "Backend Engineering Spec"
        }
    ]

    for t in tasks:
        print(f"\nProcessing {t['title']}...")
        render_markdown_file(t["md"], t["html"], t["title"], t["category"])
        compile_html_to_pdf(t["html"], t["pdf"], t["header"])

    # Clean up temp chrome profile
    temp_dir = os.path.join(workspace, "temp-chrome-docs")
    if os.path.exists(temp_dir):
        subprocess.run(["powershell", "-Command", f"Remove-Item -Force -Recurse '{temp_dir}' -ErrorAction SilentlyContinue"])

if __name__ == "__main__":
    main()
