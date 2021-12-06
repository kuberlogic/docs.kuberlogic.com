# Components

[[TOC]]

## operator

KuberLogic’s heart is the `operator`. It is responsible for keeping services in a healthy state.

### Operator configuration

The `operator` needs a set of configuration parameters passed as environment variables:

| name | type | default | description |
| --- | --- | --- | --- |
| IMG_REPO | string | “” | Container image repository where KuberLogic container images are located. Required. |
| IMG_PULL_SECRET | string | “” | ImagePullSecret name for the registry of KuberLogic container images. Optional. |
| POD_NAMESPACE | string | “” | Namespace in which KuberLogic `operator` is running. Required. |
| SENTRY_DSN | string | “” | Sentry URL to report panics. Optional. |
| NOTIFICATION_CHANNELS_EMAIL_ENABLED | bool | false | Enable email notification channel for KuberLogic alerts. Optional. |
| NOTIFICATION_CHANNELS_EMAIL_HOST | string | “” | SMTP host for email notification channel. Optional. |
| NOTIFICATION_CHANNELS_EMAIL_PORT | int | 0 | SMTP port for . Optional. |
| NOTIFICATION_CHANNELS_EMAIL_TLS_INSECURE | bool | false | Do not verify TLS when connected to SMTP server. Optional. |
| NOTIFICATION_CHANNELS_EMAIL_TLS_ENABLED | bool | false | Use TLS when connecting to SMTP server. Optional. |
| NOTIFICATION_CHANNELS_EMAIL_USERNAME | string | “” | SMTP server connection username. Optional. |
| NOTIFICATION_CHANNELS_EMAIL_PASSWORD | string | “” | SMTP server connection password. Optional. |
| GRAFANA_ENABLED | bool | false | Enable Grafana integration for KuberLogic operator. Optional. |
| GRAFANA_ENDPOINT | string | “” | Grafana URL. Optional. |
| GRAFANA_LOGIN | string | “” | Grafana admin username. Optional. |
| GRAFANA_PASSWORD | string | “” | Grafana admin password. Optional. |
| GRAFANA_DEFAULT_DATASOURCE_ENDPOINT | “” | Prometheus URL to configure as a Grafana main datasource. Optional. |


## apiserver

KuberLogic provides a first class REST API to manage services, backup configurations, and more.

### Apiserver configuration

In order to integrate smoothly into KuberLogic, `apiserver` needs to be configured correctly. It is configured via the environment variables:

| name | type | default | description |
| - | --- | --- | --- |
| KUBERLOGIC_BIND_HOST | string | 0.0.0.0 | A host to listen on. Required |
| KUBERLOGIC_HTTP_BIND_PORT | int | 8081 | A port to listen on. Required |
| KUBERLOGIC_AUTH_PROVIDER | string | “” | Authentication provider for the REST interface. Supported: “keycloak” | “none” | Optional.
| KUBERLOGIC_AUTH_KEYCLOAK_CLIENT_ID | string | “” | Keycloak client ID for “keycloak” authentication provider. Optional. |
| KUBERLOGIC_AUTH_KEYCLOAK_CLIENT_SECRET | string | “” | Keycloak client secret. Optional. |
| KUBERLOGIC_AUTH_KEYCLOAK_REALM_NAME | string | “” | Keycloak realm name. Optional. |
| KUBERLOGIC_AUTH_KEYCLOAK_URL | string | “” | Keycloak URL. Optional. |
| KUBERLOGIC_KUBECONFIG_PATH | string | “/root/.kube/config
” |  Absolute path to kubeconfig when started outside of Kubernetes cluster. Optional. |
|  KUBERLOGIC_DEBUG_LOGS | bool | false | Enable debug logging. Optional. |
| SENTRY_DSN | string | “” | Sentry URL to report panics. Optional. |
| POSTHOG_AP_KEY | string | “” | Posthog API key for statistics. Optional. |
| KUBERLOGIC_CORS_ALLOWED_ORIGINS | string | “https://*;http://*” | `;` separated list of CORS allowed origins. Optional. |
