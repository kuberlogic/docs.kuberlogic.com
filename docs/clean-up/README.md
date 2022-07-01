# Clean up after KL

1. Uninstall KuberLogic

```jsx
make undeploy
```

1. Cleanup all KuberLogic resources

```bash
# delete KuberLogic objects
kubectl delete kuberlogicservices --all
# check and delete any PVs if there any left
kubectl get pv
kubectl delete pv <NAME>
```

1. Optionally you may want to uninstall ingress controller