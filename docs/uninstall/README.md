# Uninstalling KuberLogic

1. Uninstall KuberLogic

```shell
kubectl delete ns kuberlogic
```

1. Cleanup all KuberLogic resources

```bash
# delete KuberLogic backups
kubectl delete klb --all
# delete KuberLogicservices and restores
kubectl delete kls,klr --all
# check and delete any PVs if there any left
kubectl get pv
kubectl delete pv <NAME>
```