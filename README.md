## Getting Started with Exercise-Tracker App

### This project was created in reference to: 
- **Learn the MERN Stack** - Full Tutorial (MongoDB, Express, React, Node.js)
    > [https://www.youtube.com/watch?v=7CqJlxBYj-M&t=1994s]


-----------------------------------------------------------------------------------------------------------------
## Setting up Exercise-Tracker App

### 1. Dependencies.
- **Node.js**
- **Express.js**
- **Mongoose**
- **DockerDesktop (Enable Kubernetes)** 

### 2. Initializing project folders and dependencies.
#### **FrontEnd Client**
```bash
# Create Frontend Folders
cd client && npx create-react-app .
# Download dependencies
npm i axios react-datepicker react-router-dom bootstrap
```
#### **Backend Server**
```bash
# Create Backend Folders
cd server && npm init -y
# Download dependencies
npm i express cors mongoose dotenv && npm install -g nodemon
```

### 3. Setting up MongoAtlas DB.
- Navigate to **[https://cloud.mongodb.com/]** and login.
- Go to **Clusters -> Collections -> Add my own data -> Create Collection**.

### 4. Setting up Docker.
#### Login.
```bash 
docker login -u ${username} 
```
#### Docker cleanup commands.
```bash 
docker rm -f $(docker ps -aq)
docker image prune --all --force
docker system prune
```

### 5. Connecting to Database.
- Go to **Clusters -> Connect -> MongoDB** for VS Code.
- Copy uri into var **<ATLAS_URI>** in .env file with extension [/exerTracker?retryWrites=true&w=majority]
- In **[k8s/secret.yml]** need to update the **<data.DBPASSWORD>** to base-encoded64 **<ATLAS_URI>**
    ```bash
    # output of this command is the value of the secret. 
    echo -n "${WORD}" | base64
    ``` 


-----------------------------------------------------------------------------------------------------------------
## Running Exercise-Tracker App locally

### 1. Debugging.
- **<Shift + Ctrl + J> to open browser console for debugging.**
    ```bash
    npm ls react
    npm cache clean --force
    npm install -g npm
    ```

### 2. Running project manually.
- **Open two terminals.**
    ```bash
    cd server && npm start
    cd client && npm start
    ```

### 3. Running project Docker.
- **Run project.**
    * On windows machine open DockerDesktop.
    * navigate to **[http://localhost:3050/]** in browser after running compose.
        ```bash
        docker-compose -f docker-compose.dev.yml up --detach
        docker-compose -f docker-compose.dev.yml down
        ```

### 4. Running project K8s.
#### Initiate K8s.
    - Initiate K8s.
- Create repos [mern-exertracker-client] and [mern-exertracker-server] in Dockerhub before pushing images there. Need images in Dockerhub because thats where Kubernetes manifest files pull it from.
- **Change routes in [./server/src/index.js]**
    * `line 26`: take out the "/api"
    * `line 27`: take out the "/api"
- **Build Images.**
    ```bash
     docker build -t ayfantis53/mern-exertracker-client ./client
     docker build -t ayfantis53/mern-exertracker-server ./server
     ```
- **Push to Dockerhub.**
    ```bash
    docker push ayfantis53/mern-exertracker-client 
    docker push ayfantis53/mern-exertracker-server
    ```
#### Run project.
- **Navigate to [127.0.0.1:8080] in browser.**
```bash
# Apply Ingress Controller from Kubernetes.
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.2/deploy/static/provider/cloud/deploy.yaml
# Get rid of this validating webhook or our ingress service will not build. 
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission 
# Apply our Deployment files.
kubectl apply -f k8s/
```

#### Take down project.
```bash
# Take down Ingress
kubectl delete -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.2/deploy/static/provider/cloud/deploy.yaml
# Take down local manifests
kubectl delete -f k8s/
```

#### Debug K8 project.
```bash
# Check status of all pods
kubectl get pods
# Get more detail on specific pod
kubectl describe pod ${pod-name}
```

-----------------------------------------------------------------------------------------------------------------
## Running Exercise-Tracker App in Cloud (AWS)
### 1. ELB Deployment
- **Important steps:**
    * Set the security group in AWS to listen on ports 8080-9000
    * Set a bigger EC2 Instance t2-medium
    * Set environmental variables
    * Put EC2 Instances Ip address into MongoAtlas DB whitelist
### 2. EKS Deployment
- **Important names and commands:**
    * AWS_EKS_CLUSTER_NAME = eks-cluster
    * aws eks list-clusters --region us-east-2
    * aws eks update-kubeconfig --region us-east-2 --name eks-cluster
    * kubectl get svc