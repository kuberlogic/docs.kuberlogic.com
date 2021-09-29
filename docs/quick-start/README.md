# Quick start

[[TOC]]

## Creating new service and starting application from KuberLogic

1. Go to the KuberLogic Ui and click **Create new service**
    |![](/images/CreateNewService.png)|
    |-----|
2. Select desired service
    |![](/images/SelectService.png)|
    |-----|
3. Select the service version, name your service (lowercase only), and set service resource limits
    |![](/images/InitialSettings.png)|
    |-----|
4. Scroll up and click **Create new service**
    |![](/images/Create.png)|
    |-----|
5. Check the status of your new service on the **Services** tab. Initializing takes some time. Refresh the page to see a new status.
    |![](/images/ServicesTab.png)|
    |-----|
6. When the status changes to **Ready** it's time to run an application (Arsenii to add)
7. 

## Setting up backup

1. Go to the **Services** tab and click a desired service
2. Go to the **Backups** tab
    |![](/images/Backups.png)|
    |-----|
3. Click **Backup storage** and set up it, then click **Save**
    |![](/images/BackupStorage.png)|
    |-----|
4. Set up backup schedule, select **Daily** or **Weekly** and set the time
    |![](/images/AutomaticBackups.png)|
    |-----|
5. To allow automatic backups, move the slider
6. Database backups will be displayed in the table once performed



## Managing service

1. Go to the **Services** tab to see the list of your services
    |![](/images/KuberLogicServices.png)|
    |-----|
    The following information is available:
    * Service – service name
    * Status – service status
    * Master nodes
    * Read-only replica nodes – you can change the number by selecting it
    * Created – creation date
2. Click a service name to go to the **Connection** tab and see the service connection parameters
    |![](/images/ConnectionTab.png)|
    |-----|
3. Go to the **Settings** tab to see and change the service main settings
    |![](/images/Settings.png)|
    |-----|
    * Automatic version upgrades – slide to allow updates within maintenance window
    * Maintenance windows – select day and time
    * Limits – change the limits
    * Advanced settings – use it only if you're aware of what you're doing

    After editing, click **Save changes** 
4. Go to the **Logs** tab to see MySQL logs for master and replicas
    |![](/images/Settings.png)|
    |-----|
5. Go to the **Backups** tab to [manage backups](/quick-start/#setting-up-backup)
6. To delete a service, click **Delete service** and confirm your decision