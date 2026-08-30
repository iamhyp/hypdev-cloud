/*
 * Technical skills, in one place.
 *
 * The CV page renders these as a table and the home page shell prints
 * them for the `stack` command. Neither holds its own copy, so removing
 * a tool removes it from both and the two can never disagree about what
 * is claimed.
 *
 * Microsoft 365 administration (M365 Admin, Intune, Purview) was removed
 * on 2026-08-30 at the owner's direction. The Azure infrastructure and
 * Defender entries stay: they are platform and security work rather than
 * workplace administration.
 */
export interface SkillRow {
	key: string;
	value: string;
}

export interface SkillGroup {
	heading: string;
	rows: SkillRow[];
}

export const skillGroups: SkillGroup[] = [
	{
		heading: 'Cloud and infrastructure',
		rows: [
			{
				key: 'aws',
				value: 'VPC, EC2, S3, RDS, Lambda, ECS, EKS, CloudWatch, GuardDuty, CloudTrail, WAF',
			},
			{ key: 'azure', value: 'Azure VNet, Azure Monitor, Entra application proxy' },
			{
				key: 'iac and devops',
				value: 'Terraform, CloudFormation, Ansible, CI/CD (GitHub Actions, AWS CodePipeline)',
			},
			{
				key: 'architecture',
				value: 'Hybrid cloud, cloud migration, multi-AZ architecture, disaster recovery planning',
			},
			{ key: 'automation', value: 'Python, C++, PowerShell, Bash' },
		],
	},
	{
		heading: 'Security, networking and compliance',
		rows: [
			{ key: 'frameworks', value: 'Essential 8, ISO 27001, NIST 800-171 and 177, PCI DSS, GDPR' },
			{
				key: 'perimeter',
				value: 'Palo Alto Networks, Fortinet, Checkpoint, WAF, security groups, network ACLs',
			},
			{
				key: 'identity',
				value: 'IAM and RBAC, MFA, Active Directory, Group Policy, access control systems',
			},
			{ key: 'networking', value: 'TCP/IP, DNS, DHCP, VLAN, SD-WAN, MPLS, Cisco, Aruba, Meraki' },
			{
				key: 'threat protection',
				value:
					'Defender for Cloud Apps, Defender for Endpoint, Windows Defender Exploit Guard',
			},
			{ key: 'monitoring', value: 'PRTG, WhatsUp Gold, Cacti' },
		],
	},
	{
		heading: 'Systems and virtualisation',
		rows: [
			{ key: 'operating systems', value: 'Linux (Ubuntu and RHEL), Windows Server 2016 to 2022' },
			{
				key: 'virtualisation',
				value: 'VMware vSphere and ESXi, Hyper-V, virtual desktop infrastructure',
			},
			{ key: 'endpoint', value: 'SCCM, MDM' },
			{ key: 'ticketing', value: 'ServiceNow, Jira, Spiceworks' },
		],
	},
];
