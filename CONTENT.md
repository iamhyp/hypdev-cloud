# CONTENT.md
# hypdev.cloud — Approved Website Content
# Read this file before generating any page content.
# All content on the site must match this file exactly.
# Do not invent, paraphrase, or add to this content.

---

## Identity

Name: Lawal
Title: Platform Security Engineer / DevSecOps
Location: Sydney, Australia
Domain: hypdev.cloud

Location line: Australia · Remote
Placed directly below the subtitle line, not above
the name. Same small muted monospace treatment.

Name display treatment:
Render as "Lawal." at 64px minimum, bold,
JetBrains Mono, line height 1, letter spacing
-0.03em. The word Lawal in text primary #e8eaf0.
The full stop in accent cyan #00bcd4. This is the
most prominent element on the site and must have
real visual weight.

---

## Subtitle line

Infrastructure as Code | Kubernetes | Cloud Security | Applied AI

Note: pipe separators, no em dashes, no emojis.

---

## Hero paragraph

I build secure platforms and harden cloud-native
infrastructure at scale. My work sits across
infrastructure as code, Kubernetes security, and
applied AI workload protection. I bring depth from
AWS, research from two funded master's degrees, and
hands-on work from production environments.

---

## Home page section order

Build the home page in this order.

1. Hero: name, role line, subtitle line, location
   line, paragraph, buttons.
2. Terminal window. It is the most visually striking
   element on the page and belongs near the top where
   visitors actually see it, not below the fold.
3. Security pillars.
4. Tech stack.
5. Stats row.

Credentials land after the substance. The pillars
say how you think, which is more distinctive than a
certification count anyone can claim.

---

## Hero buttons

Primary button: View projects
Secondary button: About me
Link: GitHub
Link: LinkedIn

---

## Stats row

Exactly three stats, in this order:

Stat 1: 5+  label: Certifications
Stat 2: 3+  label: Peer-reviewed publications
Stat 3: 2   label: Funded master's degrees

---

## Security pillars

Four pillars in this order:

Pillar 1
Name: Perimeter
Description: WAF, network firewall, zero trust
access. Threats are rejected before they reach
compute.
Note: blast radius first

Pillar 2
Name: Identity
Description: Least-privilege IAM, IRSA, RBAC.
Overly broad roles are the most common breach
vector.
Note: least privilege

Pillar 3
Name: Data protection
Description: KMS, Secrets Manager, Vault. Key
management is where real security judgment lives.
Note: encryption at rest

Pillar 4
Name: Detection
Description: GuardDuty, Falco, CloudTrail, Security
Hub. Prevention always fails. Detection speed is
the metric.
Note: MITRE ATT&CK mapped

---

## Tech stack section

Displayed on the home page below the security
pillars. Three columns, each a bordered panel with
a heading in cyan monospace uppercase and a grid of
tool tiles beneath.

Each tile shows the real vendor SVG logo above the
tool name. Logos are stored locally in
public/icons/ and never loaded from an external CDN,
so the Content-Security-Policy stays strict.

Column 1 heading: CLOUD & INFRA
AWS
Azure
Terraform
Kubernetes
Docker

Column 2 heading: CI/CD & AUTOMATION
Jenkins
GitHub Actions
ArgoCD
Ansible

Column 3 heading: LANGUAGES & DEV
Python
C++
Bash
PowerShell

Icon files required in public/icons/
aws.svg
azure.svg
terraform.svg
kubernetes.svg
docker.svg
jenkins.svg
github.svg
argocd.svg
ansible.svg
python.svg
cplusplus.svg
bash.svg
powershell.svg

Source all icons from simpleicons.org and save
locally. Do not use a CDN.

---

## Terminal animation commands

Cycle through these commands in order with a typing
and deleting effect. Use JetBrains Mono font.

terraform init && terraform plan -out=tfplan
cosign verify --key cosign.pub registry/app:prod
trivy image --severity CRITICAL app:v3
opa eval --data policy/ --input request.json data.allow
kubectl auth can-i --list --namespace production
falco --rules custom_rules.yaml --output-format json

---

## Navigation

Order: Home, Projects, About, Certifications, Blog
Right side: theme toggle, then the Contact button as
the primary call to action.

The CV page is not in the main navigation. It is
reachable from the contact page and the footer.

The CV download is not in the navigation. It lives
on the contact page alongside the other ways to
reach me. A visitor who wants my CV will look there.

Mobile navigation at 375px collapses to a hamburger
menu revealing the five links stacked vertically,
with the Contact button remaining visible in the bar
at all times so the primary call to action is never
hidden.

---

## About page sidebar

Sidebar contains the avatar and the education
entries only. Do not repeat the name, role, or
location in the sidebar. The navigation and the
hero already establish those, and repeating them
is redundancy rather than reinforcement.

Education entries in this order:

Entry 1:
Degree: MSc Cyber Security Engineering
Institution: University of Technology Sydney
Badge: Excellence Scholarship

Entry 2:
Degree: MSc AI Convergence Engineering
Institution: Pukyong National University
Badge: Korean Govt Scholarship

Entry 3:
Degree: BEng Electrical and Electronic Engineering
Institution: Kwara State University
No badge

---

## About page main column

Three paragraphs in this order. Use exactly this
wording:

Paragraph 1:
I am a Platform Security Engineer working at the
intersection of infrastructure as code, Kubernetes
security, and applied AI. My focus is building
platforms that are secure by design across cloud
providers.

Note: hero paragraph and about paragraphs are
approved for launch. Revisit wording after the site
is live and viewable on a real screen.

Paragraph 2:
My background started in electrical and electronic
engineering, moved through embedded systems research
and published work in industrial AI anomaly
detection, and has settled in cloud security
engineering. That path gives me a systems-level view
I find useful when thinking about how things break
and how to harden them.

Paragraph 3:
I completed two funded postgraduate degrees — in AI
Convergence Engineering from Pukyong National
University, and in Cyber Security Engineering from
the University of Technology Sydney. The research I
did during those years shapes how I approach
detection and monitoring work today.

---

## Selected publications

Section heading: Selected publications
Show three publications. Add a "View all
publications" link after the third.

Publication 1:
Title: Design and Implementation of Data-Driven
Defect and Linearity Assessment of EPS System
Journal: Journal of IoT and Convergence

Publication 2:
Title: A Deep Learning Approach to Anomaly
Detection in an Electrical Power Steering System
Journal: Sensor Journal

Publication 3:
Title: Design and Implementation of EPS Defect
Monitoring Platform
Journal: IEIE Conference

No "view all" link. The heading "Selected
publications" already implies more exist. Three
well-chosen papers read stronger than a long list.

Each publication title links directly to the paper.
URLs are stored in the publications array in
site.ts, one entry per paper with title, journal,
and url.

---

## Certifications page

Section 1 heading: AWS certifications
Layout: three cards in a row

Card 1:
Name: AWS Security Specialty
Icon: public/icons/aws.svg
Verify link: sourced from src/config/site.ts

Card 2:
Name: AWS Solutions Architect Associate
Icon: public/icons/aws.svg
Verify link: sourced from src/config/site.ts

Card 3:
Name: AWS Developer Associate
Icon: public/icons/aws.svg
Verify link: sourced from src/config/site.ts

Each card shows the real vendor logo, the
certification name, and a "Verify on Credly" link.
No tick marks. Never use the word "Certified".

Section 2 heading: Infrastructure and networking
Layout: two cards in a row

Card 1:
Name: Terraform Associate
Icon: public/icons/terraform.svg
Verify link: sourced from src/config/site.ts

Card 2:
Name: Cisco CCNA
Icon: public/icons/cisco.svg
Verify link: sourced from src/config/site.ts

Section 3 heading: Kubernetes
Layout: single full-width bar

Content:
Icon: public/icons/kubernetes.svg
Name: Kubestronaut
Sub: CNCF, five Kubernetes certifications
Status pill: in progress

Section 4 heading: Scholarships and recognition
Layout: stacked items, name bold above awarding
body in muted text

Item 1:
Name: UTS Postgraduate Academic Excellence
International Scholarship
Awarding body: University of Technology Sydney

Item 2:
Name: Korean Government Scholarship
Awarding body: Korea Ministry of Education

Item 3:
Name: Certificate of Excellence
Awarding body: National Institute for
International Education

---

## Contact page

Heading: Contact

Intro line: The best ways to reach me.

Three links, all values sourced from
src/config/site.ts: social.linkedin, social.github,
social.email.

Below the links, a CV section with the heading
Curriculum vitae, a single line reading "Read my CV
online or download a PDF copy", and two buttons:
View CV linking to the CV page, and Download PDF
linking to the path in the site.ts cv field and
opening in a new tab.

No form at launch.

---

## Projects page empty state

Heading: Projects
Body: Projects appear here when fully built,
documented, and pushed to GitHub.

---

## Blog page empty state

Heading: Blog
Body: Posts appear here as projects complete.

---

## Footer

Left: hypdev.cloud, 2026
Right links: CV, GitHub, LinkedIn, Email

The logo in the navigation links to the home page.

---

## Location wording by context

Hero: Australia · Remote
About page: not shown, the sidebar holds education only
CV page: Sydney, Australia · Open to remote and hybrid roles
Footer: not shown

The CV is where specificity helps, because a
recruiter reading it has already decided to consider
you. Everywhere else, Australia establishes work
rights and time zone without narrowing to one city.

---

## CV page

Heading: Curriculum vitae

Below the heading: name, title, and the CV location
line "Sydney, Australia · Open to remote and hybrid
roles", then two buttons, Download PDF and Get in
touch.

Then these sections in order, each rendered in the
site design system as native HTML, not an embedded
PDF: Experience, Education, Certifications,
Publications, Technical skills.

Education, Certifications, and Publications reuse the
values already defined elsewhere in this file and in
site.ts. There is one source of truth for each.

Experience content is supplied during the build.
Claude Code prompts for it section by section and
does not invent any role, date, or responsibility.

---

## Themes

The site supports dark and light themes.

On first visit the theme follows the visitor's
operating system preference. The toggle overrides it
and the choice persists in localStorage.

Light palette direction: warm white background,
near-black text, same cyan accent.

The terminal window stays dark in both themes.
Terminals are dark by convention.

The theme toggle sits in the navigation to the left
of the Contact button and remains visible at 375px
rather than hiding inside the hamburger menu.

---

## Page titles and descriptions

Every page passes a title and description to the
layout. Use these exactly.

Home
Title: Lawal Alabe, Platform Security Engineer
Description: Platform Security Engineer in Sydney
working across infrastructure as code, Kubernetes
security, and applied AI workload protection.

Projects
Title: Projects, Lawal Alabe
Description: Security engineering projects covering
infrastructure as code, cloud security architecture,
and Kubernetes platform hardening.

About
Title: About, Lawal Alabe
Description: Platform Security Engineer with two
funded postgraduate degrees in AI Convergence
Engineering and Cyber Security Engineering.

Certifications
Title: Certifications, Lawal Alabe
Description: AWS Security Specialty, Solutions
Architect, Developer Associate, Terraform Associate,
and Cisco CCNA, with Kubestronaut in progress.

Blog
Title: Blog, Lawal Alabe
Description: Writeups on cloud security architecture,
infrastructure as code, and Kubernetes platform
hardening.

Contact
Title: Contact, Lawal Alabe
Description: Get in touch with Lawal Alabe, Platform
Security Engineer based in Sydney, Australia.

CV
Title: Curriculum vitae, Lawal Alabe
Description: Curriculum vitae for Lawal Alabe,
Platform Security Engineer in Sydney working across
infrastructure as code, Kubernetes security, and
applied AI workload protection.

404
Title: Page not found, Lawal Alabe
Description: The page you are looking for does not
exist.

Site name for Open Graph: hypdev.cloud
Default social preview description: same as the home
page description.

---

## Design tokens

These are referenced here so Claude Code has them
alongside the content. Do not apply them to content;
apply them to components and CSS only.

Background primary: #08090e
Background secondary: #0c0d14
Card: #101119
Card hover: #13141f
Accent cyan: #00bcd4
Accent cyan dim: rgba(0,188,212,0.08)
Accent cyan border: rgba(0,188,212,0.14)
Text primary: #e8eaf0
Text secondary: #8892aa
Text faint: #464f6a
Border faint: rgba(255,255,255,0.055)
Border subtle: rgba(255,255,255,0.09)
Green: #1db86a
Amber: #e8a020
Red: #e05252

Font body: Inter, weights 400 and 500
Font mono: JetBrains Mono, weight 400
Load both from Google Fonts with display swap.

---

## Content rules

No emojis anywhere on the site.
No em dashes in site copy.
No placeholder text on any published page.
No content beyond what is listed in this file.
Empty states for Projects and Blog are
intentional and must look deliberate.
Only real completed work is ever published.
Legal name for the LICENSE file and copyright:
Lawal Alabe

All URLs, links, and site-wide values live in
src/config/site.ts as a single typed source of
truth. Claude Code prompts the user for each value
during Stage 1 and writes them into that file.
No URL is ever hardcoded into a component.

The CV download on the contact page links to
public/documents/lawal-cv.pdf which the user supplies
during Stage 1. The path is stored in the cv field of
src/config/site.ts and never hardcoded.
