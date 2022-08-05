# Getting Started

* [Welcome to KuberLogic](/getting-started/#welcome-to-kuberlogic)
* [Installation](/getting-started/#installation)

## Welcome to KuberLogic

KuberLogic is an open-source solution that helps to deliver any single-tenant application (one stack per customer) to multiple users as-a-cloud service. KuberLogic allows software vendors to accelerate their journey to Software-as-a-Service (SaaS) with minimal modifications to the application.

Follow the [Installation guide](/getting-started/#installation) to set up your environment and install KuberLogic.

#### Features

* Application instance (Tenant) orchestration (list/provision/delete)
* Both manual and scheduled backups and restores
* Custom domain (subdomain) support
* Application (Tenant) isolation
* SSL support
* RESTful API and CLI for service management (bare minimum)

#### Coming soon

* Integration with billing provider (ChargeBee)
* Scheduled and Instant backups (Velero)
* Application instance updates [More details here →](https://kuberlogic.clearflask.com/)

#### Why use KuberLogic?

The ultimate goal of KuberLogic is to provide an easily accessible service to turn any containerized application into a cloud-native SaaS solution.

KuberLogic:
* Provides a straightforward and reliable way to deploy and manage application instances (Tenants) while achieving maximum resource utilization and standardization.
* Simplify migration to multi-tenancy using industry-standard containers & K8s and allows rapid migration to SaaS with minimal application modification.
* Gives independence and frees from vendor lock, as KuberLogic is open source and based on Kubernetes to provide a consistent platform anywhere.

#### Getting involved

Feel free to open an issue if you need any help.

You can see the roadmap/announcements and leave your feedback [here](https://kuberlogic.clearflask.com/).

You can also reach out to us at [info@kuberlogic.com](mailto:info@kuberlogic.com) or join our [Slack community](https://join.slack.com/t/kuberlogic/shared_invite/zt-x845lggh-lne0taYmwLFgQ6XZEiTJoA).

#### Requirements
* Kubernetes cluster 1.20-1.24
  * StorageClass configured as a default
  * IngressClass configured as a default
* (Optional for backups/restores) Velero v1.8.0-1.9.0 installed and configured

## Installation

#### 1. Prepare a docker-compose file for an application you want to provide as SaaS

[Read more →](/configuring/#using-dockercompose-to-provide-your-application)

#### 2. Configure Ingress controller

[Read more →](/configuring/#setting-ingress-controller)

#### 3. (Optional) Configure and enable Velero for backup/restore integration

[Read more →](/configuring/#enabling-backuprestore-capability)

#### 4. Get KuberLogic CLI

```bash
wget https://github.com/kuberlogic/kuberlogic/releases/download/latest/kuberlogic_$(uname -m)_$(uname | tr '[:upper:]' '[:lower:]') -O kuberlogic
sudo chmod +x kuberlogic
```

#### 5. Install KuberLogic

Run the following command to install KuberLogic into your Kubernetes cluster

```shell
./kuberlogic install
```

CLI will create a config file at `~/.config/kuberlogic/config.yaml` when the installation process is finished. Usually you do not have to modify this file manually, it is updated after each KuberLogic CLI installation/configuration run.

The command above can also be used to modify KuberLogic configuration parameters when it is already installed.

#### 6. Configuring DNS

Add DNS record for KuberLogic API endpoint, so it is pointing to KuberLogic Ingress IP. Alternatively, if you are evaluating KuberLogic, you may want to use /etc/hosts file to provide the access locally.
