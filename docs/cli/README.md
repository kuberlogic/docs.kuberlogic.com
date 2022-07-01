# Comand line interface

### Run the following commands to install KuberLogic CLI:

```bash
wget [https://github.com/kuberlogic/kuberlogic/releases/download/latest/kuberlogic](https://github.com/kuberlogic/kuberlogic/releases/download/latest/kuberlogic)
sudo chmod +x kuberlogic
```

Or you can build it your own:

```bash
cd kuberlogic/modules/dynamic-apiserver
make build-cli
```

### How to set hostname and token:

**For the Server side:**

Default token = 8ZTjsD3t2Q3Yq-C4-hoahcFn

**For the Client side:**

You can use the flag `--hostname` to specify hostname where hostname is the kls-api-server external-IP:

```bash
kubectl get svc -n kuberlogic
```

```bash
NAME                                     TYPE           CLUSTER-IP    EXTERNAL-IP    PORT(S)        AGE
kls-api-server                           LoadBalancer   10.48.5.67    34.133.5.167   80:30007/TCP   3m44s
kls-controller-manager-metrics-service   ClusterIP      10.48.4.207   <none>         8443/TCP       3m44s
kls-webhook-service                      ClusterIP      10.48.7.205   <none>         443/TCP        3m43s
```

Or you can create config with path `~/.config/kuberlogic/config.yaml` with content

```jsx
token: <your custom code which specified before deployment>
hostname: <hostname of apiserver>
```

In the case of config, you do not need to specify those flags in commands

### Available commands

**List all application instances (with default token):**

```bash
./kuberlogic service list --token 8ZTjsD3t2Q3Yq-C4-hoahcFn
```

You should see something like that:

```bash
№ |   ID    |      TYPE      | REPLICA | VERSION |      DOMAIN      |      STATUS
----+---------+----------------+---------+---------+------------------+--------------------
  0 | tenant1 | docker-compose |       1 |         | productname.site | ReadyConditionMet
  1 | tenant2 | docker-compose |       1 |         | productname.site | ReadyConditionMet
  2 | tenant3 | docker-compose |       1 |         | productname.site | ReadyConditionMet
```

You can access your application through ID.DOMAIN (eg. tenant1.productname.site)

**List all application instances:**

```bash
./kuberlogic service list
```

**Add application (application provisioning):**

```bash
./kuberlogic service add --id tenant1 --type docker-compose --replicas 1 --domain productname.site
```

**Delete application:**

```bash
./kuberlogic service delete --id demo
```

**Additional parameters:**

Example:

```bash
./kuberlogic service add --id demo --type docker-compose --limits.cpu 50 --host [example.com](http://example.com/) --replicas 1
```

Optionally you may want to enable TLS secured access to a provisioned service:

```bash
./kuberlogic service add --id demo --type docker-compose --limits.cpu 50 --host [example.com](http://example.com/) --replicas 1 --tls_enabled
```