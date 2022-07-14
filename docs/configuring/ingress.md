# Setting Ingress controller

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

---
**NOTE**

You can only have a single default ingressClass.

---

If you don't have a default `ingressClass` installed, you need to set up one:

```shell

```bash
kubectl get ingressclasses
kubectl annotate ingressclass kong ingressclass.kubernetes.io/is-default-class=true
```

**You should change “kong” to your ingressClass name if you use another Ingress controller. You can only have one default `ingressClass`, so make sure no other ingressClasses marked as default.**