# An overview of KuberLogic’s architecture

The namespace-per-tenant model represents a good blend of isolation and cost efficiency. For this reason, we’ve chosen to implement it in KuberLogic.

In this conception each tenant (application instance) is deployed into the same cluster but separated from one another using namespaces and a series of native and add-on Kubernetes constructs. This is what’s commonly referred to as a “silo” model where tenant resources are not shared by tenants. Also, this model is commonly referred to as “multi-instance”.

![](/images/architecture.png)

### **Multi-instance architecture benefits:**

- Stability— Instead of a single point of failure (the single application instance), each customer can exist in their own instance. If one instance fails, the others will remain unaffected.
- Scalability — With a multi-instance architecture, scaling up is a simple matter of adding more resources. However, with a multi-tenant architecture, you could reach a point where you need to come up with a clustered application architecture whose deployment is usually far from trivial.
- Security — When you are using a single database, all your data lives together. This becomes a major problem in the event of a security breach because all customers’ data can become vulnerable when a single account is compromised. With a multi-instance architecture, only a single customer’s data can be at risk.

### **KuberLogic implements proven patterns of multi-tenancy on Kubernetes:**

- *[Building a Multi-Tenant SaaS Solution Using Amazon EKS](https://aws.amazon.com/blogs/apn/building-a-multi-tenant-saas-solution-using-amazon-eks/)*
- *[SaaS provider multi-tenancy on Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/docs/concepts/multitenancy-overview#saas_provider_multi-tenancy)*
- *[Multi-tenancy in SaaS and KaaS Service Models on Alibaba Container Service](https://www.alibabacloud.com/blog/practices-of-kubernetes-multi-tenant-clusters_596178)*
- *[Use Azure Kubernetes Service and AGIC in a multi-tenant environment](https://docs.microsoft.com/en-us/samples/azure-samples/aks-multi-tenant-agic/aks-multi-tenant-agic/)*