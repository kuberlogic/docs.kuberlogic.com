# Configuring KuberLogic

## Using docker-compose to provide your application
KuberLogic provides a simple way to deploy your application as SaaS by supporting `docker-compose.yaml` structure.

::: warning
KuberLogic only supports a single application type configured via docker-compose.yaml. Any change to this file will be propagated to all KuberLogic managed applications.
:::

You will be asked to enter path to the docker-compose.yml during the installation process, otherwise KuberLogic will be provisioned with demo application.

### Limitations
There are few limitations about supported docker-compose.yaml:

#### Only one service can have its ports published
**Will work:**
```yaml
version: "3"
services:
  - name: my-service
    image: my-image
    command:
      - "./run.sh"
- name: my-service-2
  image: my-image
  ports:
    - "8080:8080"
  command:
    - "./run.sh"
```

**Will not work:**
```yaml
version: "3"
services:
  - name: my-service
    image: my-image
    ports:
      - "8080:8080"
    command:
      - "./run.sh"
- name: my-service-2
  image: my-image
  ports:
    - "8080:8080"
  command:
    - "./run.sh"
```

#### Only a single port can be published.
**Will work:**
```yaml
version: "3"
services:
  - name: my-service
    image: my-image
    command:
      - "./run.sh"
- name: my-service-2
  image: my-image
  ports:
    - "8080:8080"
  command:
    - "./run.sh"
```

**Will not work:**
```yaml
version: "3"
services:
  - name: my-service
    image: my-image
    command:
      - "./run.sh"
- name: my-service-2
  image: my-image
  ports:
    - "8080:8080"
    - "8081:8081"
  command:
    - "./run.sh"
```

#### Local volume mounts are not supported
**Will work:**
```yaml
version: "3"
volumes:
  data:

services:
  - name: my-service
    image: my-image
    command:
      - "./run.sh"
    volumes:
      - data:/data
```

**Will not work:**
```yaml
version: "3"
services:
  - name: my-service
    image: my-image
    command:
      - "./run.sh"
    volumes:
      - ./data:/data
```

### Supported docker-compose extensions
You can use the following extensions to your docker-compose.yaml:

#### `x-kuberlogic-access-http-path`
This extension allows you to expose more than one `docker-compose` service by specifying HTTP path prefixes. Default path prefix is `/`.

Duplicates are not allowed and will trigger a service provisioning error.

**Will work:**
```yaml
version: "3"
services:
  - name: api # This will be exposed at `/api`
    x-kuberlogic-access-http-path: /api
    image: my-image
    command:
      - "./run.sh"
    ports:
      - "8080:8080"
  - name: web # This will be exposed on `/`
    image: web
    ports:
      - "8080:8080"
```

**Will not work:**
```yaml
version: "3"
services:
  - name: api # This will be exposed at `/api`
    x-kuberlogic-access-http-path: /api
    image: my-image
    command:
      - "./run.sh"
    ports:
      - "8080:8080"
  - name: web # Duplicate HTTP path prefix!
    x-kuberlogic-access-http-path: /api
    image: web
    ports:
      - "8080:8080"
```

### Templating `docker-compose.yaml`
KuberLogic also supports templating certain service fields in `docker-compose.yaml` by using Go templates.

Fields that can be templated are:
* `image`
* `command`
* `environment` variables' values

Service parameters that can be accessed in the template are:
* `Name`: The name of the service
* `Namespace`: The namespace of the service
* `Host`: The host of the service
* `Replicas`: The number of replicas of the service
* `VolumeSize`: The size of the volume of the service
* `Version`: The version of the service
* `TLSEnabled`: Whether the service is TLS enabled
* `Parameters`: The advanced parameters of the service

There are also a few functions that can be used for environment variables:
* `.Endpoint`: Returns the endpoint of the service
* `.GenerateKey <len: int,optional>`: Generate a random key of the specified length
* `.GenerateRSAKey <bits: int,optional>`: Generate a random RSA key of the specified length
* `PersistentSecret <id: string,optional>`: Saves the value of the field in a persistent secret that will be used by the service. (Note the absence of . at the start of the function).

::: warning
`Generate...` functions will generate different values each time the template is rendered. This will result in constant service restarts.

You should use `PersistentSecret` function to store the generated value of the field in a persistent secret.
:::

#### Examples
##### Specify the image version
Provisioned services will use `version` as the image tag or "latest" if not specified.

```yaml
version: "3"
services:
  - name: my-service
    image: my-image:{{ default .Version "latest" }}
    command:
      - "./run.sh"
    ports:
      - "8080:8080"
```

##### Configure service URL parameter
```yaml
version: "3"
services:
  - name: my-service
    image: my-image
    command:
      - "./run.sh"
    ports:
      - "8080:8080"
    environment:
      - BASE_URL={{ .Endpoint }}
```

##### Generate a random key and save it to the persistent secret
```yaml
version: "3"
services:
  - name: my-service
    image: my-image
    command:
      - "./run.sh"
    ports:
      - "8080:8080"
    environment:
      - SECRET_KEY={{ .GenerateKey 30 | PersistentSecret }}
```

##### Generate a random RSA key and access it for the different service
RSA key will be generated and saved in a persistent secret under the "PRIVATE_RSA_KEY" key.
```yaml
version: "3"
services:
  - name: my-service
    image: my-image
    command:
      - "./run.sh"
    ports:
      - "8080:8080"
    environment:
      - SECRET_KEY={{ .GenerateRSAKey 2048 | PersistentSecret "PRIVATE_RSA_KEY" }}
  - name: my-service-2
    image: my-image
    command:
      - "./run.sh"
    ports:
      - "8080:8080"
    environment:
      - SECRET_KEY={{ .GenerateRSAKey 2048 | PersistentSecret "PRIVATE_RSA_KEY" }}
```

## Setting Ingress controller

KuberLogic requires Ingress controller to be expose services to the public internet.

To install Ingress controller, follow Kong installation guide:

[https://github.com/Kong/kubernetes-ingress-controller](https://github.com/Kong/kubernetes-ingress-controller)

Or just run to apply kong ingress controller:

```bash
kubectl apply -f https://bit.ly/k4k8s
```

Check if you have a default `ingressClass` installed:
```shell
kubectl get ingressclasses -o go-template='{{ range .items }}{{ if eq ( index .metadata.annotations "ingressclass.kubernetes.io/is-default-class" ) "true" }}{{ println .metadata.name }}{{ end }}{{ end }}' | xargs echo "Default ingressClass:"```
```

If your output is `Default ingressClass: <ingressClass>`, then you have a default `ingressClass` installed.

::: tip
You can only have a single default ingressClass.
:::

If you don't have a default `ingressClass` installed, you need to set up one:

```shell
kubectl get ingressclasses
kubectl annotate ingressclass kong ingressclass.kubernetes.io/is-default-class=true
```

**You should change “kong” to your ingressClass name if you use another Ingress controller. You can only have one default `ingressClass`, so make sure no other ingressClasses marked as default.**

## Configuring TLS certificate

It is assumed that the TLS certificate will be a wildcard certificate. All KuberLogic managed applications share the same certificate by sharing the same ingress controller.

Kuberlogic allows you to secure application access with TLS certificate. KuberLogic uses a sample TLS certificate by default.

## Enabling backup/restore capability

::: warning
Backups will only work if you use CSI based volumes. Backups will not work for `hostPath` volumes.
:::

Backups and restores feature is provided via [Velero](https://velero.io) integration. Both file-based and volume snapshot based backups are supported.
Backups and restores are disabled by default. Follow these steps to configure environment and enable backup feature:

1. Get supported Velero release (follow the [steps](https://velero.io/docs/v1.9/basic-install/) from the official Velero website)

2. Install Velero for your [infrastructure provider](https://velero.io/docs/v1.9/supported-providers/). Make sure to include `--use-restic` to enable file based backups.

3. Verify Velero status.
```shell
velero version
# Example output
#
# Client:
#         Version: v1.9.0
#         Git commit: -
# Server:
#         Version: v1.9.0
velero get backup-locations
# Example output
# NAME      PROVIDER   BUCKET/PREFIX     PHASE       LAST VALIDATED                   ACCESS MODE   DEFAULT
# default   aws        kl-demo-backups   Available   2022-07-11 13:54:24 +0300 EEST   ReadWrite     true
```