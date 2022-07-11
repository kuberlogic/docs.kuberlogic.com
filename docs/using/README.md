# Using KuberLogic

KuberLogic comes with CLI that helps you manage your applications.

### Application management
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