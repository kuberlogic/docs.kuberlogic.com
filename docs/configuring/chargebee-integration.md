#Chargebee integration

KuberLogic uses Webhooks to interact with the billing providers (such as Chargebee).

###Configuring KuberLogic

You should set Chargebee integration params in `kuberlogic/modules/dynamic-operator/config/manager/kustomization.yaml`

```shell
  - chargebee_site=
  - chargebee_key=
  - kuberlogic_domain=
```

Example:

```shell
  - chargebee_site=example-test
  - chargebee_key=test_aTwdMcu4LDMU3eCadmXCJYcubL60tGDYbGeUg
  - kuberlogic_domain=example.com
```

### Configuring ChargeBee

You should add and configure in ChargeBee:

1.  [API keys](https://www.chargebee.com/docs/2.0/api_keys.html)
2.  [Webhook](https://www.chargebee.com/docs/2.0/events_and_webhooks.html)
3.  [Products and checkout](https://www.chargebee.com/checkout-portal-docs/drop-in-integration.html#integrating-checkout)
4.  [Single Page Customer Portal](https://www.chargebee.com/docs/1.0/customer_portal.html)

Webhook configuration example:

![image.png](media_Chargebee%20integration/image.png)

**Webhook URL should lead to "kls-chargebee-integration" service External IP.**

Type to see the IP:
```shell
kubectl get svc -n kuberlogic
# Example output
#NAME                                     TYPE           CLUSTER-IP   EXTERNAL-IP      PORT(S)        AGE
#kls-api-server                           LoadBalancer   10.8.10.73   34.121.153.159   80:31098/TCP   5h19m
#kls-chargebee-integration                LoadBalancer   10.8.10.7    34.135.30.100    80:32415/TCP   5h19m
#kls-controller-manager-metrics-service   ClusterIP      10.8.4.214   <none>           8443/TCP       5h19m
#kls-webhook-service                      ClusterIP      10.8.15.55   <none>           443/TCP        5h19m
```