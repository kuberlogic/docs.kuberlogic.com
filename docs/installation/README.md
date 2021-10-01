# Installation

[[TOC]]

## Requirements

KuberLogic leverages a lot of top notch open-source projects and it requires a specific environment to run on top of:
* Kubernetes v1.20.x with:
   * StorageClass configured as a default
   * LoadBalancer Services
   * At least 3 nodes in cluster with 4G of RAM and 2 CPUs each
* S3 compatible storage for backups (optional)
* Helm v3.4 CLI tool


## How to install

1. Download the `kuberlogic-installer` command-line installation tool [here](https://github.com/kuberlogic/operator/releases)
2. Prepare the configuration file. You can [use the following file as an example](https://github.com/kuberlogic/operator/blob/master/modules/installer/sample-config.yaml).
3. Run the following command:
    ```
    kuberlogic-installer install all -c <configFile>
    ```
4. Access KuberLogic Web UI via connection endpoint from the previous step
