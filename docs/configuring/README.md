# Configuring SSL

It is assumed that the TLS certificate will a wildcard certificate. All KuberLogic managed applications share the same certificate via sharing the same ingress controller.

Kuberlogic allows you to secure application access with TLS certificate. Follow the steps below to configure this integration:

1. Switch to **modules/dynamic-operator/config/certificate** directory and replace the value of tls.crt file (should be plain text TLS certificate) and tls.key (should be plain text TLS private key).
2. Go to the **modules/dynamic-operator** directory and deploy updated manifests

```bash
make deploy
```