# Setting Ingress controller

Follow kong installation guide. Or you can choose another ingress controller.

[https://github.com/Kong/kubernetes-ingress-controller](https://github.com/Kong/kubernetes-ingress-controller)

Or just run to apply kong ingress controller:

```bash
kubectl apply -f https://bit.ly/k4k8s
```

**Make sure that the Ingress class is set by default.**

Set:

```bash
kubectl annotate ingressclass kong ingressclass.kubernetes.io/is-default-class=true
```

*You should change “kong” (e.g. nginx) into the following command if you use another Ingress controller.