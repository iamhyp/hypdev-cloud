// Single source of truth for every site-wide value. Components read from
// this file — no URL, name, or path is ever hardcoded into a component.

export interface Certification {
	name: string;
	icon: string;
	credlyUrl: string;
}

export interface Publication {
	title: string;
	journal: string;
	url: string;
}

export interface SiteConfig {
	site: {
		name: string;
		title: string;
		description: string;
		domain: string;
	};
	author: {
		name: string;
		role: string;
		location: string;
	};
	social: {
		linkedin: string;
		github: string;
		// Bare username, used by the /api/github serverless route. Kept
		// separate from the profile URL so neither has to be parsed out
		// of the other.
		githubUser: string;
		email: string;
	};
	certifications: Certification[];
	publications: Publication[];
	cv: string;
}

export const siteConfig: SiteConfig = {
	site: {
		name: 'hypdev.cloud',
		title: 'Lawal Alabe, Platform Security Engineer',
		description:
			'Platform Security Engineer in Sydney working across infrastructure as code, Kubernetes security, and applied AI workload protection.',
		domain: 'hypdev.cloud',
	},
	author: {
		name: 'Lawal Alabe',
		role: 'Platform Security Engineer / DevSecOps',
		// The location line exactly as it is displayed. The hero, the CV
		// page and the shell's whoami all read this one value, because
		// they previously held three different hardcoded phrasings.
		// Sydney is not dropped: it is in the meta description on every
		// page, which is where a search engine reads it from.
		location: 'Australia · Remote',
	},
	social: {
		linkedin: 'https://www.linkedin.com/in/lawal-alabe-546873125/',
		// Taken from this repository's own git remote. Confirm this is the
		// account you want the site to point at before deploying.
		github: 'https://github.com/iamhyp',
		githubUser: 'iamhyp',
		email: 'hyperdevroot@gmail.com',
	},
	certifications: [
		{
			name: 'AWS Security Specialty',
			icon: '/icons/aws.svg',
			credlyUrl:
				'https://www.credly.com/badges/729f69e8-dafe-4790-8629-1b4646a380d0/public_url',
		},
		{
			name: 'AWS Solutions Architect Associate',
			icon: '/icons/aws.svg',
			credlyUrl:
				'https://www.credly.com/badges/3940e6eb-d62f-44ae-add2-f3ef698aa2b1/public_url',
		},
		{
			name: 'AWS Developer Associate',
			icon: '/icons/aws.svg',
			credlyUrl:
				'https://www.credly.com/badges/a9245405-f9d2-4d59-91f6-8543d5f228a1/public_url',
		},
		{
			name: 'Terraform Associate',
			icon: '/icons/terraform.svg',
			credlyUrl:
				'https://www.credly.com/badges/3f0a3277-e3fd-4903-b872-f0f010d334b5/public_url',
		},
		{
			name: 'Cisco CCNA',
			icon: '/icons/cisco.svg',
			credlyUrl:
				'https://www.credly.com/badges/92728a6a-7410-4162-810d-cc3e71fb39ce/public_url',
		},
	],
	publications: [
		{
			title: 'Design and Implementation of Data-Driven Defect and Linearity Assessment of EPS System',
			journal: 'Journal of IoT and Convergence',
			url: 'https://doi.org/10.20465/KIOTS.2023.9.2.061',
		},
		{
			title: 'A Deep Learning Approach to Anomaly Detection in an Electrical Power Steering System',
			journal: 'Sensor Journal',
			url: 'https://doi.org/10.3390/s22228981',
		},
		{
			title: 'Design and Implementation of EPS Defect Monitoring Platform',
			journal: 'IEIE Conference',
			url: 'https://www.dbpia.co.kr/Journal/articleDetail?nodeId=NODE11132967',
		},
	],
	cv: '/documents/lawal-cv.pdf',
};

export default siteConfig;
