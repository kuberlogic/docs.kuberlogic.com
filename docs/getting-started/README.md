# Getting Started

## Requirements
* Kubernetes cluster 1.20-1.24
  * StorageClass configured as a default
  * IngressClass configured as a default
* (Optional for backups/restores) Velero v1.8.0-1.9.0 installed and configured

## Installation

#### 1. Prepare a docker-compose file for an application you want to provide as SaaS

> **If you install KuberLogic for testing and studying you can skip this step (sample app is also included).**

See [more](/configuring/#using-dockercompose-to-provide-your-application) about docker-compose.yml limitations.

#### 2. Configure Ingress controller

[Read more →](/configuring/#setting-ingress-controller)

#### 3. (Optional) Configure and enable Velero for backup/restore integration

[Read more →](/configuring/#enabling-backuprestore-capability)

#### 4. Get KuberLogic CLI

```shell
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

#### 6. Configure DNS

Add DNS record for KuberLogic API endpoint, so it is pointing to KuberLogic Ingress IP. Alternatively, if you are evaluating KuberLogic, you may want to use /etc/hosts file to provide the access locally.
