# Getting Started

## Requirements
* Kubernetes cluster 1.20-1.24
  * StorageClass configured as a default
  * IngressClass configured as a default
* (Optional for backups/restores) Velero v1.8.0-1.9.0 installed and configured

## Installation

#### 1. Clone the repository and checkout `latest-release` tag

```bash
git clone https://github.com/kuberlogic/kuberlogic
cd kuberlogic
git checkout latest-release
```

#### 2. Add an application you want to provide as SaaS. 

> **If you install KuberLogic for testing and studying you can skip this and next step (sample app is also included), and proceed to Step #4.**

To add your application just put the contents of your application's `docker-compose.yml` into `modules/dynamic-operator/config/manager/docker-compose.yaml`. There are several limitations [Read more →](/configuring/#using-dockercompose-to-provide-your-application)

#### 3. Edit KuberLogic configuration file

General KuberLogic settings are carried out by editing `modules/dynamic-operator/config/manager/kustomization.yaml` file:

- Set your own token to secure API-server (Default token = 8ZTjsD3t2Q3Yq-C4-hoahcFn).

- Configure and enable KuberLogic backup/restore integration. [Read more →](/configuring/#enabling-backuprestore-capability)

- Configure and enable Billing provider integration. [Read more →](/configuring/#billing_integration)

#### 4. Deploy cert-manager

Cert-manager is used by many KuberLogic components to provide certificates for admission webhooks.

```bash
cd modules/dynamic-operator
make deploy-certmanager
```

#### 5. Setting Ingress controller

[Read more →](/configuring/#setting-ingress-controller)


#### 6. Deploy KuberLogic

```bash
make deploy
```

#### 7. Install KuberLogic command line interface (CLI)

Run the following commands to install KuberLogic CLI interface:

```bash
wget https://github.com/kuberlogic/kuberlogic/releases/download/latest/kuberlogic
sudo chmod +x kuberlogic
```

Specify hostname in `~/.config/kuberlogic/config.yaml`where hostname is the kls-api-server external-IP.

 [Read more →](/cli/)

#### 8. Configuring TLS certificate

Kuberlogic allows you to secure application access with TLS certificate. Follow the steps below to configure.

[Read more →](/configuring/#configuring-tls-certificate)

#### 9. Configuring DNS

Add DNS records for KuberLogic endpoints so they are pointing to KuberLogic Ingress IP. Alternatively, if you are evaluating KuberLogic, you may want to use /etc/hosts file to provide the access locally.
