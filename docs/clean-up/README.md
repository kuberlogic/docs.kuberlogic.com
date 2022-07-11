# Clean up after KL

1. Uninstall KuberLogic

```jsx
make undeploy
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

1. Optionally you may want to uninstall ingress controller