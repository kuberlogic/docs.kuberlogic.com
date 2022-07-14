# Using KuberLogic
[REST API](#application-management-with-REST-API)  
[CLI](#Application-management-with-CLI)


KuberLogic comes with CLI and REST API that helps you manage your applications.

## Application management with REST API
See the [openapi.yaml](https://github.com/kuberlogic/kuberlogic/blob/master/modules/dynamic-apiserver/openapi.yaml) for REST API reference.

### Examples
#### Create an application
```bash
curl --header 'X-Token: <KuberLogic API server token>' -X POST -H "Content-Type: application/json" -d '{
  "id": "my-app",
  "type": "my-app-type",
  "domain": "example.com",
}' <KuberLogic API server endpoint>/api/v1/services
```

#### List applications
```bash
curl <kuberlogic API server endpoint>/api/v1/services
```

## Application management with CLI
#### Use help command to see the list of commands.
```shell
./kuberlogic help
```
    
done
```

#### List all application instances

```bash
./kuberlogic service list
```

#### Add application (application provisioning)

```bash
./kuberlogic service add --id tenant1 --type docker-compose --replicas 1 --domain productname.site
```

#### Delete application

```bash
./kuberlogic service delete --id demo
```

#### Additional parameters

Example:

```bash
./kuberlogic service add --id demo --type docker-compose --limits.cpu 50 --host example.com --replicas 1
```

Optionally you may want to enable TLS secured access to a provisioned service:

```bash
./kuberlogic service add --id demo --type docker-compose --limits.cpu 50 --host example.com --replicas 1 --tls_enabled
```

### Backup management
#### Backup application
```bash
./kuberlogic service backup --service_id demo
```

#### List all backups
```shell
./kuberlogic backup list
```

#### List all backups for a single application
```shell
./kuberlogic backup list --service_id demo
```

#### Delete backup
```shell
./kuberlogic backup delete --id demo-1657538554 
```

### Restore management
#### Restore a service from backup
```shell
./kuberlogic backup restore --backup_id demo-1657538554
```

#### List restores
```shell
./kuberlogic restore list
```

#### List restores for a single application
```shell 
./kuberlogic restore list --service_id demo
```

#### Delete restore
```shell
./kuberlogic restore delete --id demo-1657538554
```