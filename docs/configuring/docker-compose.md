# Using docker-compose to provide your application
KuberLogic provides a simple way to deploy your application as SaaS by supporting `docker-compose.yaml` structure.

---
**NOTE**

KuberLogic only supports a single application type configured via docker-compose.yaml. Any change to this file will be propagated to all KuberLogic managed applications.

---

## Configuration
To add your application just put the contents of your application's `docker-compose.yml` into `modules/dynamic-operator/config/manager/docker-compose.yaml`

## Limitations
There are few limitations about supported docker-compose.yaml:

### Only one service can have its ports published
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

### Only a single port can be published.
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

### Local volume mounts are not supported
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

## Supported docker-compose extensions
You can use the following extensions to your docker-compose.yaml:

### `x-kuberlogic-access-http-path`
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

## Templating `docker-compose.yaml`
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

---
**NOTE**

`Generate...` functions will generate different values each time the template is rendered. This will result in constant service restarts.

You should use `PersistentSecret` function to store the generated value of the field in a persistent secret.

---

### Examples
#### Specify the image version
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

#### Configure service URL parameter
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

#### Generate a random key and save it to the persistent secret
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

#### Generate a random RSA key and access it for the different service
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