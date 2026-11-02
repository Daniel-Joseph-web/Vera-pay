import os
import subprocess
import sys

HTML_CONTENT = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Verapay PRD v2.0</title>
<style>
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
    font-size: 9pt;
    margin: 0;
    padding: 0;
  }

  /* Header Branding */
  .brand-header {
    border-bottom: 2px solid #007A5E;
    padding-bottom: 8px;
    margin-bottom: 12px;
  }

  .brand-title {
    font-size: 24pt;
    font-weight: 800;
    color: #007A5E;
    margin: 0 0 2px 0;
    letter-spacing: -0.5px;
  }

  .brand-tagline {
    font-size: 11pt;
    font-weight: 500;
    color: #4A5568;
    margin: 0 0 4px 0;
  }

  .doc-subtitle {
    font-size: 8.5pt;
    color: #718096;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Headings */
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
    font-size: 10pt;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 4px;
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

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
    font-size: 8.5pt;
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

  /* Metadata Table */
  .meta-table th {
    width: 18%;
    background-color: #006644;
    color: #FFFFFF;
  }
  .meta-table td {
    background-color: #FFFFFF !important;
  }

  /* Callout Boxes */
  .callout {
    padding: 8px 12px;
    border-radius: 5px;
    margin-bottom: 8px;
    font-size: 8.5pt;
    page-break-inside: avoid;
  }

  .callout-rule {
    background-color: #F0FDF4;
    border-left: 4px solid #16A34A;
    color: #166534;
  }

  .callout-warn {
    background-color: #FEF3C7;
    border-left: 4px solid #D97706;
    color: #92400E;
  }

  .callout-info {
    background-color: #EFF6FF;
    border-left: 4px solid #3B82F6;
    color: #1E40AF;
  }

  /* Badges */
  .badge {
    display: inline-block;
    padding: 1px 6px;
    border-radius: 3px;
    font-weight: 700;
    font-size: 7.5pt;
    letter-spacing: 0.3px;
  }

  .badge-green { background-color: #DCFCE7; color: #15803D; border: 1px solid #BBF7D0; }
  .badge-amber { background-color: #FEF3C7; color: #B45309; border: 1px solid #FDE68A; }
  .badge-red { background-color: #FEE2E2; color: #B91C1C; border: 1px solid #FECACA; }
  .badge-tier { background-color: #E0E7FF; color: #3730A3; border: 1px solid #C7D2FE; }

  /* Flow Diagram Container */
  .flow-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #F8FAFC;
    border: 1px solid #CBD5E1;
    border-radius: 6px;
    padding: 8px 12px;
    margin-bottom: 10px;
    page-break-inside: avoid;
  }

  .flow-step {
    flex: 1;
    text-align: center;
    padding: 4px;
  }

  .flow-title {
    font-weight: 700;
    font-size: 8pt;
    color: #006644;
  }

  .flow-desc {
    font-size: 7pt;
    color: #64748B;
  }

  .flow-arrow {
    color: #007A5E;
    font-weight: bold;
    font-size: 11pt;
    padding: 0 4px;
  }

  .avoid-break {
    page-break-inside: avoid;
  }

  .page-break {
    page-break-before: always;
  }
</style>
</head>
<body>

  <!-- Brand Header -->
  <div class="brand-header">
    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <h1 class="brand-title">Verapay</h1>
        <div class="brand-tagline">Verify, then release.</div>
        <div class="doc-subtitle">Product Requirements Document (PRD) | Hackathon & Production Blueprint v2.0</div>
      </div>
      <div style="text-align: right; font-size: 8pt; color: #718096;">
        <div><strong>Status:</strong> Active Specification</div>
        <div><strong>Date:</strong> October 2026</div>
      </div>
    </div>
  </div>

  <!-- Document Metadata Table -->
  <table class="meta-table">
    <tr>
      <th>Product</th>
      <td><strong>Verapay:</strong> AI-verified, milestone-gated, sender-approved payments to Nigerian providers</td>
    </tr>
    <tr>
      <th>Target Users</th>
      <td>Nigerians in the UK, US, and Canada paying for recurring family support, school fees, and capital construction projects back home</td>
    </tr>
    <tr>
      <th>Platform Rails</th>
      <td><strong>Sender Side:</strong> PayPal Checkout (Sandbox for Hackathon demo) &bull; <strong>Payout Side:</strong> Licensed Nigerian PSSP (Paystack / Flutterwave) for direct NUBAN Naira transfers</td>
    </tr>
    <tr>
      <th>Plans & Pricing</th>
      <td><strong>Basic:</strong> 1.5% per payment &bull; <strong>Verapay Plus:</strong> $9.99/mo ($0 per-payment fee up to $1,000/mo) &bull; <strong>Verapay Projects:</strong> 2% of stage value</td>
    </tr>
  </table>

  <div class="callout callout-rule">
    <strong>The Unbreakable Core Principle:</strong> Everyone gets the exact same institutional-grade safety checks, whether free or paying. Premium never buys more protection or bypasses verification. It buys convenience, family collaboration tools, recurring automation, and rapid human escalation.
  </div>

  <!-- 1. Overview -->
  <h2>1. Overview</h2>
  <p>
    Verapay helps Nigerians abroad pay for school fees, family living support, medical care, and building projects back home without relying on an informal go-between. The sender funds an escrow payment through PayPal. Verapay holds it safely with a licensed payment partner, AI verifies the legitimacy and ground truth of the invoice or milestone, and the sender gives final approval. Only then is money released to the provider's Nigerian bank account. If proof fails, 100% of the funds are refunded.
  </p>
  
  <div class="flow-box">
    <div class="flow-step">
      <div class="flow-title">1. Fund Escrow</div>
      <div class="flow-desc">PayPal Checkout Sandbox / Card</div>
    </div>
    <div class="flow-arrow">&rarr;</div>
    <div class="flow-step">
      <div class="flow-title">2. Safe Hold</div>
      <div class="flow-desc">Held by licensed escrow partner</div>
    </div>
    <div class="flow-arrow">&rarr;</div>
    <div class="flow-step">
      <div class="flow-title">3. AI Verification</div>
      <div class="flow-desc">CAC, NUBAN, OCR & Ground-Truth</div>
    </div>
    <div class="flow-arrow">&rarr;</div>
    <div class="flow-step">
      <div class="flow-title">4. Sender Decides</div>
      <div class="flow-desc">Green / Amber / Red card</div>
    </div>
    <div class="flow-arrow">&rarr;</div>
    <div class="flow-step">
      <div class="flow-title">5. Direct Payout</div>
      <div class="flow-desc">NUBAN Naira or 1-Click Refund</div>
    </div>
  </div>

  <p><strong>Three Core Product Rules:</strong></p>
  <ul>
    <li><strong>Pay the provider, not an informal go-between:</strong> Money goes straight to the registered school, hospital, landlord, or material merchant—never handed as cash to a relative to pass on.</li>
    <li><strong>Proof before release:</strong> Invoices, CAC status, bank account names, live photos, and delivery notes are verified by AI before funds move.</li>
    <li><strong>The sender decides:</strong> AI assesses risk and suggests actions, but the sender always retains the final say. AI never releases money autonomously.</li>
  </ul>

  <!-- 2. Problem Statement -->
  <h2>2. Problem Statement & Failure Modes</h2>
  <p>
    Nigerians abroad remit approximately <strong>$20 billion annually</strong>. Yet once money is transferred into a Nigerian bank account via NIBSS, it is virtually impossible to trace or recover. Diasporans face an agonizing choice between blind trust and emotional friction.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Failure Mode</th>
        <th style="width: 45%;">What Happens in Reality</th>
        <th style="width: 30%;">Verapay Mitigation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Diversion</strong></td>
        <td>Money sent for a house foundation or school tuition is diverted to personal expenses by relatives.</td>
        <td>Direct provider NUBAN disbursement; no go-between touches the money.</td>
      </tr>
      <tr>
        <td><strong>Contractor Stalls</strong></td>
        <td>Contractors demand upfront lump sums, slow down, send vague promises, and demand more funds.</td>
        <td>Milestone-gated escrow: funds released only as each stage is completed and verified.</td>
      </tr>
      <tr>
        <td><strong>Price Padding</strong></td>
        <td>Contractors inflate material costs (e.g., claiming cement is ₦14,000 when market rate is ₦10,500).</td>
        <td>Autonomous <strong>Quote Agent</strong> benchmarks 2–3 nearby regional supplier prices.</td>
      </tr>
      <tr>
        <td><strong>Easy-to-Fake Proof</strong></td>
        <td>Modern tools allow contractors to generate fake invoices or reuse construction photos from other sites.</td>
        <td>In-app live camera (blocks gallery), perceptual photo hashing, and surprise 15-second video prompts.</td>
      </tr>
      <tr>
        <td><strong>Irreversible Transfers</strong></td>
        <td>Nigerian bank transfers (NIP) are instantaneous and permanent; fraud recovery is virtually non-existent.</td>
        <td>Funds remain in sender-controlled escrow until proof is verified and approved.</td>
      </tr>
    </tbody>
  </table>

  <!-- 3. Plans & Pricing Matrix -->
  <h2>3. Plans & Pricing Structure</h2>
  <p>
    Verapay provides three plans tailored to different sender frequencies. Senders on all plans receive identical verification checks; paid tiers provide convenience, family collaboration, and priority escalation.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 18%;">Plan</th>
        <th style="width: 32%;">Target Persona</th>
        <th style="width: 20%;">Cost</th>
        <th style="width: 30%;">Included Features</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="badge badge-tier">Basic</span></td>
        <td>Occasional senders paying termly school fees or emergency hospital bills.</td>
        <td><strong>1.5% per payment</strong><br>Min $1, Max $20 cap.<br>$0 monthly fee.</td>
        <td>
          &bull; Full 4-step AI verification<br>
          &bull; CAC and bank account matching<br>
          &bull; Single-transaction receipt archive
        </td>
      </tr>
      <tr>
        <td><span class="badge badge-tier">Verapay Plus</span></td>
        <td>Families sending monthly allowances, rent, and groceries to parents/relatives.</td>
        <td><strong>$9.99 / month</strong><br>0% per-payment fee up to $1,000/mo.</td>
        <td>
          &bull; <strong>Automatic monthly payments</strong> with bill re-check<br>
          &bull; <strong>Family Group workspace</strong> (abroad & home relatives)<br>
          &bull; <strong>Shared Pot</strong> (siblings split one major bill)<br>
          &bull; <strong>Quicker human help</strong> (Amber flags triaged in hours)<br>
          &bull; <strong>Monthly 1-page financial audit</strong> with receipts
        </td>
      </tr>
      <tr>
        <td><span class="badge badge-tier">Verapay Projects</span></td>
        <td>Diaspora building a home, buying land, or operating a commercial farm/business.</td>
        <td><strong>2% of each stage</strong><br>Charged only when milestone is approved.</td>
        <td>
          &bull; Stage-by-stage plan (foundation, walls, roof, finish)<br>
          &bull; <strong>AI Quote Agent</strong> (compares 2–3 supplier prices)<br>
          &bull; Live in-app photo & surprise 15s video checks<br>
          &bull; Weekly plain-English project briefing<br>
          &bull; Optional certified surveyor site inspection booking<br>
          &bull; Contractor dispute mediation support
        </td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-info">
    <strong>Real-World Example (Tunde in Manchester):</strong><br>
    Tunde lives in Manchester. Every month he sends $800 for his parents' rent and sustenance, and pays his sister's school fees each term.<br>
    &bull; <strong>On Basic:</strong> His fee would be 1.5% of $800 = <strong>$12.00 a month</strong>.<br>
    &bull; <strong>On Verapay Plus:</strong> He pays <strong>$9.99 a month</strong>. He saves money while gaining automated payments, a shared family portal for his siblings, and an audited monthly summary.<br>
    &bull; <strong>Why judges and investors like this:</strong> Monthly subscriptions turn transactional remittances into steady, predictable Annual Recurring Revenue (ARR).
  </div>

  <!-- Page Break for Clean Layout -->
  <div class="page-break"></div>

  <!-- 4. How Verapay Verifies -->
  <h2>4. The 4-Step Verification Engine: How Verapay Verifies</h2>
  <p>
    Before any funds move from escrow to a provider, Verapay runs three objective verification gates. The sender then makes the final decision on Gate 4.
  </p>

  <div class="avoid-break">
    <h3>Gate 1: Is the Person Being Paid Real?</h3>
    <ul>
      <li><strong>Corporate Affairs Commission (CAC) Verification:</strong> When a school, hospital, or merchant is first added, Verapay queries the CAC database to ensure it is legally incorporated and active.</li>
      <li><strong>NUBAN Account Name Match:</strong> The beneficiary bank account retrieved via NIBSS must match the registered business name. Prevents contractors from routing funds to personal accounts or cousins.</li>
      <li><strong>Small Sellers without CAC:</strong> Many market sellers (e.g., local sand or timber dealers) are informal. For these:
        <ul>
          <li>Verapay validates phone number, shop location, and bank account holder name.</li>
          <li><strong>Pay-on-Delivery Rule:</strong> Funds are locked in escrow and released <em>only after materials physically arrive on site and the recipient taps confirmation</em>.</li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="avoid-break">
    <h3>Gate 2: Is the Bill Honest?</h3>
    <ul>
      <li><strong>Multimodal Document OCR:</strong> AI reads student/patient names, items, quantities, unit prices, and invoice dates.</li>
      <li><strong>Coherence & Anti-Duplicate Check:</strong> Checks that the child/patient matches family records, mathematics add up correctly, and the invoice perceptual hash has not been submitted previously.</li>
      <li><strong>The Quote Agent (Anti-Padding):</strong> For building supplies (cement, blocks, rebar), the AI samples 2–3 nearby certified merchants to benchmark fair market rates.</li>
    </ul>
  </div>

  <div class="avoid-break">
    <h3>Gate 3: Did It Really Happen? (Ground-Truth by Category)</h3>
    <ul>
      <li><strong>School Fees, Medical Bills & Rent:</strong> Institutional invoices and verified bank rails cover the primary risk. Upon direct payout, an official institution receipt is automatically archived and sent to the sender.</li>
      <li><strong>Consumer Goods (Food, Appliances):</strong> Verapay holds escrow until the designated family member at home taps <strong>"Item Received"</strong> in their mobile app.</li>
      <li><strong>Construction & Farm Projects:</strong>
        <ul>
          <li><strong>In-App Live Camera:</strong> Photos must be taken inside the Verapay app. Uploads from device camera rolls are strictly blocked. Time, GPS location, and device orientation are permanently tagged.</li>
          <li><strong>Anti-Replay Protection:</strong> Vision models compare images against past submissions to catch reused or staged photos.</li>
          <li><strong>Surprise 15-Second Video:</strong> Contractors are randomly prompted to capture a continuous 15-second video pan of the site showing a dynamic app challenge code.</li>
          <li><strong>Surveyor Site Visits:</strong> For major stages, users can book an on-demand verified surveyor through Verapay.</li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="avoid-break">
    <h3>Gate 4: The Sender Decides (Traffic Light UI)</h3>
    <p>AI never moves money autonomously. It presents a simple, clear card with a definitive recommendation:</p>
    <table>
      <thead>
        <tr>
          <th style="width: 20%;">Signal</th>
          <th style="width: 30%;">User Prompt</th>
          <th style="width: 50%;">Action Triggered</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge badge-green">GREEN</span> <strong>All Clear</strong></td>
          <td><em>"All good. Pay?"</em></td>
          <td>Provider CAC active, bill price fair, proof verified. Sender taps <strong>Yes</strong> &rarr; instant payout.</td>
        </tr>
        <tr>
          <td><span class="badge badge-amber">AMBER</span> <strong>Discrepancy</strong></td>
          <td><em>"Price looks high. Pay a cheaper shop instead?"</em></td>
          <td>Quote Agent found cheaper nearby suppliers, or photo is blurry. Sender reviews quotes or requests Plus human review.</td>
        </tr>
        <tr>
          <td><span class="badge badge-red">RED</span> <strong>Proof Failed</strong></td>
          <td><em>"The proof failed. Your money is safe with us."</em></td>
          <td>Reused photo, fraudulent bill, or account mismatch caught. 1-click full refund to PayPal.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 5. Payee Onboarding Workflows -->
  <h2>5. Payee Onboarding & Verification Workflows</h2>
  
  <div class="avoid-break">
    <p><strong>Case 1: The Organisation is New (First-time payment)</strong></p>
    <p>
      Aunty adds a payment (e.g., <em>"Ada School Fees, Bright Future School"</em>) and uploads the invoice. Verapay detects that Bright Future School is not yet in its directory. While Aunty's money waits safely in escrow, Verapay verifies the school's CAC status, confirms the bank account is registered to the school's exact name, and checks the physical address. Once verified, the invoice is checked. Aunty taps "Yes", and the school is paid directly.
    </p>

    <p><strong>Case 2: The Organisation is Already Verified (Network Moat)</strong></p>
    <p>
      If another family has previously paid Bright Future School through Verapay, the institution is already marked as verified. Verapay skips institutional checks and proceeds immediately to bill line-item auditing. Over time, as schools and hospitals are verified, payments become near-instantaneous.
    </p>

    <p><strong>Additional Workflows:</strong></p>
    <ul>
      <li><strong>Advance Registration:</strong> Senders can pre-register and verify schools, landlords, or clinics weeks before bills arrive, ensuring zero friction when fees are due.</li>
      <li><strong>Small Unregistered Merchants:</strong> For local artisans or cement sellers without corporate registration, Verapay verifies personal bank identity and phone, releasing escrow strictly on physical delivery confirmation.</li>
    </ul>
  </div>

  <!-- 6. Functional Requirements -->
  <h2>6. Functional Requirements: What the AI Checks</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 10%;">ID</th>
        <th style="width: 45%;">Requirement</th>
        <th style="width: 45%;">Implementation Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>F1</strong></td>
        <td>Read invoices, receipts, handwritten quotes, and voice notes (including Nigerian Pidgin and Yoruba); summarize in plain English.</td>
        <td>Multimodal LLM (Gemini) pipeline; prompt tuned for West African terminology and invoice layouts.</td>
      </tr>
      <tr>
        <td><strong>F2</strong></td>
        <td>Verify payee legitimacy: match invoice name with NUBAN bank account; verify registered businesses via CAC registry.</td>
        <td>Direct NIP account lookup API + CAC registry search. Unregistered fall back to phone/delivery proof.</td>
      </tr>
      <tr>
        <td><strong>F3</strong></td>
        <td>The <strong>Quote Agent</strong>: benchmark material prices against regional supplier quotes; flag price padding.</td>
        <td>Autonomous scraping / simulated pricing matrix across Lagos, Ibadan, Abuja, and Port Harcourt.</td>
      </tr>
      <tr>
        <td><strong>F4</strong></td>
        <td>Live camera verification: capture photos exclusively via in-app viewfinder; record timestamp, GPS, and compass heading.</td>
        <td>Disables photo library/gallery file uploads to prevent historical photo injection.</td>
      </tr>
      <tr>
        <td><strong>F5</strong></td>
        <td>Document and photo forensics: detect duplicate perceptual hashes, mismatched totals, and reused receipts.</td>
        <td>Image pHash comparison against media archive; arithmetic consistency validator.</td>
      </tr>
      <tr>
        <td><strong>F6</strong></td>
        <td>Surprise 15-second video audit challenge for construction milestones.</td>
        <td>Dynamic in-app prompt requiring contractor to record continuous pan showing a daily visual code.</td>
      </tr>
      <tr>
        <td><strong>F7</strong></td>
        <td>Report and wait: present concise Green/Amber/Red traffic light card. No funds move without sender tap.</td>
        <td>Sender retains 100% control. AI never executes financial transfers autonomously.</td>
      </tr>
      <tr>
        <td><strong>F8</strong></td>
        <td>Automatic refund: instant return of held escrow funds if verification fails or sender rejects.</td>
        <td>PayPal Refund API integration; funds return to original payment method.</td>
      </tr>
      <tr>
        <td><strong>F9</strong></td>
        <td>Recurring billing engine for Verapay Plus subscribers.</td>
        <td>Automated scheduled invoice solicitation, re-verification, and payment execution.</td>
      </tr>
      <tr>
        <td><strong>F10</strong></td>
        <td>Shared pot pooling: allow multiple diaspora family members to contribute fractional amounts to one bill.</td>
        <td>Multi-party escrow ledger; releases payout to institution when 100% target is funded.</td>
      </tr>
    </tbody>
  </table>

  <!-- Page Break -->
  <div class="page-break"></div>

  <!-- 7. Business Model & Unit Economics -->
  <h2>7. Business Model, Unit Economics & Market Scale</h2>
  
  <p>
    <strong>Core Commercial Philosophy:</strong> Verapay earns a small fee only when it safely releases money. If proof fails and no payout occurs, Verapay earns $0. Incentives are completely aligned with the sender's peace of mind.
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 28%;">Revenue Stream</th>
        <th style="width: 32%;">Fee Model</th>
        <th style="width: 40%;">Unit Economics & Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Everyday Payments</strong></td>
        <td>1.5% fee on release ($1 min, $20 cap).</td>
        <td>Aunty pays $400 school fees &rarr; Verapay fee is $6. Aunty pays $406; school gets full $400 in Naira.</td>
      </tr>
      <tr>
        <td><strong>2. Building & Projects</strong></td>
        <td>2% of each milestone stage, charged only upon approved release.</td>
        <td>Roof stage costs $3,000 &rarr; Verapay fee is $60 upon sign-off. If photos fail checks, fee is $0.</td>
      </tr>
      <tr>
        <td><strong>3. Verapay Plus Subscription</strong></td>
        <td>$9.99/month recurring flat rate.</td>
        <td>Predictable ARR. High retention among regular family supporters sending $500–$1,200/month.</td>
      </tr>
      <tr>
        <td><strong>4. Marketplace Commissions</strong></td>
        <td>15%–20% commission on partner services (surveyors, legal title searches).</td>
        <td>A certified surveyor charges $50 for a site inspection &rarr; Verapay retains $7.50 to $10.00.</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-rule">
    <strong>What Verapay Strictly Never Does:</strong><br>
    &bull; <strong>No supplier kickbacks:</strong> If Verapay took money from suppliers it recommends, its advice that "this supplier's price is fair" could not be trusted.<br>
    &bull; <strong>No earning from held float/interest:</strong> Verapay holds no deposits and takes no interest on escrow, preserving clear regulatory posture as a technical orchestration layer.
  </div>

  <p><strong>Market Scale & Opportunity:</strong></p>
  <ul>
    <li>Total annual remittances to Nigeria: <strong>~$20 Billion / year</strong>.</li>
    <li>At <strong>0.1% market capture ($20M GMV)</strong>: A 2% blended take rate yields <strong>~$400,000 / year</strong>.</li>
    <li>At <strong>1.0% market capture ($200M GMV)</strong>: Yields <strong>~$4,000,000 / year</strong> in high-margin software & verification revenue.</li>
  </ul>

  <!-- 8. Risks and Honest Limits -->
  <h2>8. Risks and Honest Limits</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 35%;">Identified Risk</th>
        <th style="width: 65%;">Honest Mitigation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>A determined cheat can stage proof</strong></td>
        <td>AI drastically reduces risk but cannot eliminate physical deceit. For large capital milestones, Verapay pairs AI with independent certified surveyor visits.</td>
      </tr>
      <tr>
        <td><strong>Nigerian providers cannot receive PayPal</strong></td>
        <td>Naira payout via licensed local partner (Paystack / Flutterwave) directly into provider's commercial NUBAN account.</td>
      </tr>
      <tr>
        <td><strong>Holding funds requires licensing</strong></td>
        <td>Verapay partners with licensed escrow and banking partners; it operates as an orchestration and verification intelligence layer.</td>
      </tr>
      <tr>
        <td><strong>Informal vendors lack paper invoices</strong></td>
        <td>Verapay supports Pidgin voice note transcription, handwritten receipt parsing, and phone verification with strict pay-on-delivery escrow.</td>
      </tr>
      <tr>
        <td><strong>Contractor resistance to milestone release</strong></td>
        <td>Target schools, hospitals, and vetted material depots first. Legitimate contractors embrace guaranteed escrow over payment disputes.</td>
      </tr>
    </tbody>
  </table>

  <!-- 9. Hackathon Demo Plan -->
  <h2>9. Hackathon Demo Plan (Under 3 Minutes)</h2>
  <p>
    Runs in PayPal's sandbox environment. The video opens with: <em>"Years of money sent home. No house. Verapay: verify, then release."</em>
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 15%;">Scene</th>
        <th style="width: 15%;">Duration</th>
        <th style="width: 70%;">What is Shown on Screen</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. School Fees</strong></td>
        <td>~30 s</td>
        <td>Aunty in London pays niece's school fees. AI checks invoice and verifies school name matches NUBAN account. Sender taps <strong>Approve</strong>; school is paid.</td>
      </tr>
      <tr>
        <td><strong>2. House in Ibadan</strong></td>
        <td>~75 s</td>
        <td>Contractor requests cement money. The <strong>Quote Agent</strong> catches a padded quote and recommends fair market supplier. Later, a reused roof photo is caught (<span class="badge badge-red">RED</span>); fresh live photo passes; milestone is paid.</td>
      </tr>
      <tr>
        <td><strong>3. Unregistered Vendor</strong></td>
        <td>~30 s</td>
        <td>Sand supplier without CAC is paid only when family on site taps <strong>"Delivered"</strong>.</td>
      </tr>
      <tr>
        <td><strong>4. 1-Click Refund</strong></td>
        <td>~15 s</td>
        <td>A fake invoice fails verification; sender taps <strong>Refund</strong>, returning money immediately via PayPal Sandbox.</td>
      </tr>
      <tr>
        <td><strong>5. Synthetic Test Set</strong></td>
        <td>~30 s</td>
        <td>Honest evaluation of 20 synthetic edge cases: catches, false flags, and misses reported transparently.</td>
      </tr>
    </tbody>
  </table>

  <!-- 10. Success Metrics & Open Items -->
  <h2>10. Success Metrics & Open Items Before Submission</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 30%;">Success Metric</th>
        <th style="width: 40%;">Measurement Method</th>
        <th style="width: 30%;">Target</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Cheats Caught</strong></td>
        <td>Share of fake, reused, or padded cases caught in 20-case test set</td>
        <td><strong>&gt; 90%</strong></td>
      </tr>
      <tr>
        <td><strong>False Flags</strong></td>
        <td>Honest submissions mistakenly flagged</td>
        <td><strong>&lt; 10%</strong> (overridable)</td>
      </tr>
      <tr>
        <td><strong>Sender Approval Latency</strong></td>
        <td>Time elapsed from submission to summary display</td>
        <td><strong>&lt; 3 minutes</strong></td>
      </tr>
      <tr>
        <td><strong>Synthetic Test Set Breadth</strong></td>
        <td>Real photos in poor lighting, Pidgin voice notes, unusual bills</td>
        <td>20 diverse cases</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-warn" style="margin-top: 10px;">
    <strong>Submission Checklist & Open Items:</strong><br>
    &bull; Confirm PayPal authorization hold window (standard 7-day auth vs. immediate capture-and-hold escrow model).<br>
    &bull; Select preferred licensed Nigerian payout partner to name in pitch (Paystack vs. Flutterwave).<br>
    &bull; Benchmark Pidgin and Yoruba voice-note accuracy with Gemini multimodal audio endpoints.<br>
    &bull; Finalize live camera component constraints in mobile browser demo.
  </div>

</body>
</html>
"""

def main():
    workspace = r"c:\Users\USER\Downloads\vera-pay"
    html_path = os.path.join(workspace, "Verapay_PRD_v2.0.html")
    pdf_path = os.path.join(workspace, "Verapay_PRD_v2.0.pdf")
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    user_data_dir = os.path.join(workspace, "temp-chrome-pdf")

    print("Writing HTML...")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)
    print("HTML written to:", html_path)

    header = '<div style="font-size: 7.5pt; width: 100%; display: flex; justify-content: space-between; padding: 0 14mm; color: #718096; font-family: Segoe UI, sans-serif;"><span>Verapay PRD | Version 2.0</span><span>Hackathon & Production Blueprint</span></div>'
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

    print("Executing Chrome headless PDF render...")
    result = subprocess.run(cmd, capture_output=True, text=True)
    print("Exit code:", result.returncode)
    if result.stdout:
        print("Stdout:", result.stdout)
    if result.stderr:
        print("Stderr:", result.stderr)

    if os.path.exists(pdf_path):
        size_kb = os.path.getsize(pdf_path) / 1024
        print(f"SUCCESS: PDF generated at {pdf_path} ({size_kb:.1f} KB)")
    else:
        print("ERROR: PDF was not generated.")

if __name__ == "__main__":
    main()
