# Super Micro Front-End

Super Micro Frontend is an experimental project using K8s as the infrastructure for a constellation of Front-End MicroServices.

## Quick Start Locally (docker-desktop)

1. Run kubectl apply on the `k8s` directory

```bash
kubectl apply -f k8s
```

2. Get the port mapping of the orchestrator service

```bash
kubectl get svc orchestrator
```

```bash
NAME           TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
orchestrator   NodePort   10.107.16.200   <none>        8080:30752/TCP   8m
```

3. Access the pod(s) via `http://kubernetes.docker.internal:30752/`. Where `30752` is the port pulled from the step above.
