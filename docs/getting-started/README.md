# Getting Started

* [Welcome to KuberLogic](/getting-started/#welcome-to-kuberlogic)
* [Installation](/getting-started/#installation)

## Welcome to KuberLogic

KuberLogic is an open-source solution that helps to deliver any single-tenant application (one stack per customer) to multiple users as-a-cloud service. KuberLogic allows software vendors to accelerate their journey to Software-as-a-Service (SaaS) with minimal modifications to the application.

Follow the [Installation guide](/getting-started/#installation) to set up your environment and install KuberLogic.

#### Features

* Application instance (Tenant) orchestration (list/provision/delete)
* Custom domain (subdomain) support
* Application (Tenant) isolation
* SSL support
* RESTful API and CLI for service management (bare minimum)

#### Coming soon

* Integration with billing provider (Stripe)
* Scheduled and Instant backups (Velero)
* Application instance updates [More details here →](https://kuberlogic.clearflask.com/)

#### Why use KuberLogic?

The ultimate goal of KuberLogic is to provide an easily accessible service to turn any containerized application into a cloud-native SaaS solution.

KuberLogic:
* Provides a straightforward and reliable way to deploy and manage application instances (Tenants) while achieving maximum resource utilization and standardization.
* Simplify migration to multi-tenancy using industry-standard containers & K8s and allows rapid migration to SaaS with minimal application modification.
* Gives independence and frees from vendor lock, as KuberLogic is open source and based on Kubernetes to provide a consistent platform anywhere.

#### Requirements
Kubernetes cluster 1.20-1.23

* StorageClass configured as a default
* IngressClass configured as a default

#### Getting involved

Feel free to open an issue if you need any help.

You can see the roadmap/announcements and leave your feedback [here](https://kuberlogic.clearflask.com/).

You can also reach out to us at [info@kuberlogic.com](mailto:info@kuberlogic.com) or join our [Slack community](https://join.slack.com/t/kuberlogic/shared_invite/zt-x845lggh-lne0taYmwLFgQ6XZEiTJoA).

## Installation

#### Prerequisites

- Kubernetes cluster 1.20-1.23
    - StorageClass configured as a default
    - IngressClass configured as a default

#### 1. Clone the repository

```bash
git clone https://github.com/kuberlogic/kuberlogic
```

#### 2. Add an application you want to provide as SaaS

Paste the contents of your application's `docker-compose.yml` into `modules/dynamic-operator/config/manager/docker-compose.yaml`

#### 3. Secure API-server (set Token)

You can set your own auth token for the API-server in file `modules/dynamic-operator/config/manager/kustomization.yaml`

#### 4. Deploy cert-manager

Cert-manager is used by many KuberLogic components to provide certificates for admission webhooks.

```bash
cd kuberlogic/modules/dynamic-operator
make deploy-certmanager
```

#### 5. Deploy the KuberLogic operator

```bash
make deploy
```

#### 6. Setting Ingress controller

Run the following command to apply kong ingress controller:

```bash
kubectl apply -f https://bit.ly/k4k8s
```

Set the Ingress class by default. You should change “kong” (e.g. nginx) into the following command if you use another Ingress controller:

```bash
kubectl annotate ingressclass kong ingressclass.kubernetes.io/is-default-class=true
```

*You should change “kong” (e.g. nginx) into the following command if you use another Ingress controller.

[Read more →](/setting-ingress-controller/)

#### 7. Install KuberLogic comand line interface (CLI)

Run the following commands to install KuberLogic CLI interface:

```bash
wget https://github.com/kuberlogic/kuberlogic/releases/download/latest/kuberlogic
sudo chmod +x kuberlogic
```

Specify hostname in `~/.config/kuberlogic/config.yaml`where hostname is the kls-api-server external-IP.

[Read more →](/cli/)

#### 8. Configuring TLS certificate

Kuberlogic allows you to secure application access with TLS certificate. Follow the steps below to configure this integration.

[Read more →](/configuring/)

#### 9. Configuring DNS

Add DNS records for KuberLogic endpoints so they are pointing to KuberLogic Ingress IP. Alternatively, if you are evaluating KuberLogic, you may want to use /etc/hosts file to provide the access locally.