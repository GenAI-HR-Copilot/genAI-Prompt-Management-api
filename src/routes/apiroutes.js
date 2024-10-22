import express from "express";
import promptController from "../controller/promptController.js";
import UserController from "../controller/userController.js";
import PromptReviewController from "../controller/promptReviewController.js";
import tagController from "../controller/promptTagController.js";
import MinioController from "../controller/MinioController.js";
import NodeController from "../controller/NodeController.js";
import FlowController from "../controller/flowController.js";
import QAController from "../controller/qaController.js";
import QuickReplyController from "../controller/quickReplyController.js";

const apiRoute = express.Router();
// prompt routes

apiRoute.post("/createPrompt", promptController.createPrompt);
apiRoute.get("/getAllPrompt", promptController.getAllPrompts);
apiRoute.get("/getPrompt/:id", promptController.getPromptById);
apiRoute.get("/getEditHistory/:id", promptController.getEditHistoryById);
apiRoute.put("/updatePrompt/:id", promptController.updatePrompt);
apiRoute.delete("/deletePrompt/:id", promptController.deletePrompt);

// user routes
apiRoute.post("/createUser", UserController.createUser);
apiRoute.get("/getAllUsers", UserController.getAllUsers);
apiRoute.get("/getUser/:id", UserController.getUserById);
apiRoute.put("/updateUser/:id", UserController.updateUser);
apiRoute.delete("/deleteUser/:id", UserController.deleteUser);
// login
apiRoute.post("/login", UserController.loginUser);

// PromptReview routes
apiRoute.post("/createPromptReview", PromptReviewController.createPromptReview);
apiRoute.get(
  "/getAllPromptReviews",
  PromptReviewController.getAllPromptReviews
);

apiRoute.get(
  "/getPromptReview/:id",
  PromptReviewController.getPromptReviewById
);
apiRoute.put(
  "/updatePromptReview/:id",
  PromptReviewController.updatePromptReview
);
apiRoute.delete(
  "/deletePromptReview/:id",
  PromptReviewController.deletePromptReview
);

// tag
apiRoute.post("/createTag", tagController.createTag);
apiRoute.get("/getAllTag", tagController.getAllTags);
apiRoute.put("/updateTag/:id", tagController.updateTag);
// minio
apiRoute.get('/files', MinioController.listJsonFiles);
apiRoute.get('/files/:objectName', MinioController.getJsonFile);
apiRoute.put('/files/:objectName', MinioController.updateJsonFile);
apiRoute.delete('/files/:objectName', MinioController.deleteJsonFile);

// node

// Create a new root parent node
apiRoute.post('/createRootParentNode', NodeController.createRootParentNode);

// Create a new node (can be either a child or root-level node)
apiRoute.post('/createNode', NodeController.createNode);

// Get all nodes
apiRoute.get('/nodes', NodeController.getAllNodes);

// Get all root parent nodes with their associated child nodes
apiRoute.get('/getAllRootParentNodes', NodeController.getAllRootParentNodes);
apiRoute.get('/nodes/root/:rootNodeId', NodeController.getParentNodeById);
apiRoute.put('/root-parent-node/:id', NodeController.updateRootParentNode);
// Get a single node by ID
apiRoute.get('/nodes/:id', NodeController.getNodeById);

// Update a node by ID
apiRoute.put('/nodes/:id', NodeController.updateNode);

// Delete a node by ID
apiRoute.delete('/nodes/:id', NodeController.deleteNode);
apiRoute.get('/nodeHierarchy/:rootNodeId', NodeController.getNodeHierarchy);

// Change the status of a node
// apiRoute.patch('/nodes/:id/status', NodeController.changeNodeStatus);

// flow routes
// Create a new flow
apiRoute.post('/createFlow', FlowController.createFlow);

// Get all flows
apiRoute.get('/flows', FlowController.getAllFlows);

// Get a single flow by ID
apiRoute.get('/flows/:id', FlowController.getFlowById);

// Update a flow by ID
apiRoute.put('/flows/:id', FlowController.updateFlow);

// Delete a flow by ID
apiRoute.delete('/flows/:id', FlowController.deleteFlow);

// QA Management routes
apiRoute.post('/qa', QAController.createQAPair);
apiRoute.get('/qa', QAController.getAllQAPairs);
apiRoute.get('/qa/:id', QAController.getQAPairById);
apiRoute.put('/qa/:id', QAController.updateQAPair);
apiRoute.delete('/qa/:id', QAController.deleteQAPair);

// Quick Reply Template routes
apiRoute.post('/templates', QuickReplyController.createTemplate);
apiRoute.get('/templates', QuickReplyController.getAllTemplates);
apiRoute.get('/templates/:id', QuickReplyController.getTemplateById);
apiRoute.put('/templates/:id', QuickReplyController.updateTemplate);
apiRoute.delete('/templates/:id', QuickReplyController.deleteTemplate);

// Quick Reply Option routes
apiRoute.post('/options/:templateId', QuickReplyController.addOptionToTemplate);
apiRoute.put('/templates/:templateId/options', QuickReplyController.updateOption);
apiRoute.delete('/options/:id', QuickReplyController.deleteOption);
export default apiRoute;
