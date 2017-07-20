/**
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import _ from 'lodash';
import BallerinaASTFactory from './../ast/ballerina-ast-factory';
import ToolGroup from './../tool-palette/tool-group';
import DefaultBallerinaASTFactory from '../ast/default-ballerina-ast-factory';

const ToolPalette = [];

const createResourceDefTool = {
    id: 'resource',
    name: 'Resource',
    cssClass: 'icon fw fw-resource',
    title: 'Resource',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createResourceDefinition,
    definition: 'Construct that handles one request within a service',
};

const createServiceDefTool = {
    id: 'service',
    name: 'Service',
    cssClass: 'icon fw fw-service',
    title: 'Service',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createServiceDefinition,
    definition: 'Container of resources, each of which defines the logic for handling one type of request',
};

const createFunctionDefTool = {
    id: 'function',
    name: 'Function',
    cssClass: 'icon fw fw-function',
    title: 'Function',
    nodeFactoryMethod: BallerinaASTFactory.createFunctionDefinition,
    definition: 'Single operation that is intended to be a unit of reusable functionality',
};

const createMainFunctionDefTool = {
    id: 'function',
    name: 'Main Function',
    meta: {
        functionName: 'main',
        functionArgs: [
            {
                type: 'message',
                identifier: 'm',
            },
        ],
    },
    cssClass: 'icon fw fw-main-function',
    title: 'Main Function',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createMainFunctionDefinition,
    definition: 'Potential entry point for command line execution',
};

const createConnectorDefTool = {
    id: 'connectorDefinition',
    name: 'Connector',
    cssClass: 'icon fw fw-connector',
    title: 'Connector Definition',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createConnectorDefinition,
    definition: 'Participant in the integration and is used to interact with an external system or a service defined',
};

const createConnectorActionTool = {
    id: 'connectorAction',
    name: 'Action',
    cssClass: 'icon fw fw-dgm-action',
    title: 'Connector Action',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createConnectorAction,
    definition: 'Operation that can be executed against a connector',
};

const createStructsDefTool = {
    id: 'struct',
    name: 'Struct',
    cssClass: 'icon fw fw-struct',
    title: 'Struct',
    nodeFactoryMethod: BallerinaASTFactory.createStructDefinition,
    definition: 'User-defined record type',
};

const createWorkerDecTool = {
    id: 'worker',
    name: 'Worker',
    cssClass: 'icon fw fw-worker',
    title: 'Worker',
    nodeFactoryMethod: BallerinaASTFactory.createWorkerDeclaration,
    definition: 'Programmable actor which is represented on a sequence diagram as a vertical lifeline of logic to be executed.',
};

const createAnnotationDefTool = {
    id: 'annotation',
    name: 'Annotation',
    cssClass: 'icon fw fw-annotation',
    title: 'Annotation Definition',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createAnnotationDefinition,
    definition: 'Hold meta data related to the attached code',
};

const mainToolDefArray = [createServiceDefTool, createResourceDefTool, createFunctionDefTool,
    createMainFunctionDefTool, createConnectorDefTool, createConnectorActionTool, createStructsDefTool,
    createWorkerDecTool, createAnnotationDefTool];

const createIfStatementTool = {
    id: 'if',
    name: 'If',
    cssClass: 'icon fw fw-dgm-if-else',
    title: 'If',
    nodeFactoryMethod: BallerinaASTFactory.createIfElseStatement,
    definition: 'Provide a way to perform conditional execution',
};

const createWhileStatementTool = {
    id: 'while',
    name: 'While',
    cssClass: 'icon fw fw-dgm-while',
    title: 'While',
    nodeFactoryMethod: BallerinaASTFactory.createWhileStatement,
    definition: 'Provide a way to execute a series of statements as long as a Boolean expression is met',
};

const createBreakStatementTool = {
    id: 'break',
    name: 'Break',
    cssClass: 'icon fw fw-break',
    title: 'Break',
    nodeFactoryMethod: BallerinaASTFactory.createBreakStatement,
    definition: 'Provide a way to terminate the immediately enclosing loop',
};

const createContinueStatementTool = {
    id: 'continue',
    name: 'Continue',
    cssClass: 'icon fw fw-continue',
    title: 'Continue',
    nodeFactoryMethod: BallerinaASTFactory.createContinueStatement,
    definition: 'Provide a way to continue with the immediately enclosing loop',
};

const createTryCatchStatementTool = {
    id: 'try-catch',
    name: 'Try-Catch',
    cssClass: 'icon fw fw-try-catch',
    title: 'Try-Catch',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createTryCatchStatement,
    definition: 'Handle the exception by the block after the catch, if any exception occurs while executing the first block of statements ',
};

const createAssignmentExpressionTool = {
    id: 'Assignment',
    name: 'Assignment',
    cssClass: 'icon fw fw-assign',
    title: 'Assignment',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createAggregatedAssignmentStatement,
    definition: 'Provide a way to assign a value to a variable accessor',
};

const createTransformStatementTool = {
    id: 'Transform',
    name: 'Transform',
    cssClass: 'icon fw fw-type-converter',
    title: 'Transform',
    nodeFactoryMethod: BallerinaASTFactory.createTransformStatement,
    definition: 'Transform any chosen variables in the enclosing scope',
};

const createJoinStatementTool = {
    id: 'Fork',
    name: 'Fork',
    cssClass: 'icon fw fw-fork-join',
    title: 'Fork',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createForkJoinStatement,
    definition: 'Provide a way to replicate a message to any number of parallel workers and have them independently operate on the copies of the message',
};

// TODO: change the icon with the new one
const createVariableDefinitionStatementTool = {
    id: 'VariableDefinition',
    name: 'Variable',
    cssClass: 'icon fw fw-variable',
    title: 'Variable Definition',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createVariableDefinitionStatement,
    definition: 'Statements which can be added anywhere a statement is allowed. \n They can be interspersed with other statements in any order',
};

const createFunctionInvocationTool = {
    id: 'FunctionInvocation',
    name: 'Function Invoke',
    cssClass: 'icon fw fw-function-invoke',
    title: 'Function Invoke',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createAggregatedFunctionInvocationStatement,
    definition: 'Provide a way to invoke/call functions',
};

const createReplyStatementTool = {
    id: 'Reply',
    name: 'Reply',
    cssClass: 'icon fw fw-reply',
    title: 'Reply',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createReplyStatement,
    definition: 'Send the request message back to the client',
};

const createReturnStatementTool = {
    id: 'Return',
    name: 'Return',
    cssClass: 'icon fw fw-return',
    title: 'Return',
    nodeFactoryMethod: BallerinaASTFactory.createReturnStatement,
    definition: 'Evaluate the expression, stops the current function, and returns the result of the expression to the caller',
};

const createWorkerInvocationStatementTool = {
    id: 'WorkerInvocation',
    name: 'Send',
    cssClass: 'icon fw fw-worker-invoke',
    title: 'Worker Invocation',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createWorkerInvocationStatement,
    definition: 'Provide a way to send a message to a worker',
};

const createWorkerReplyStatementTool = {
    id: 'WorkerReply',
    name: 'Receive',
    cssClass: 'icon fw fw-worker-reply',
    title: 'Worker Receive',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createWorkerReplyStatement,
    definition: 'Provide a way to receive the reply from a worker',
};

const createThrowStatementTool = {
    id: 'Throw',
    name: 'Throw',
    cssClass: 'icon fw fw-throw',
    title: 'Throw',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createThrowStatement,
    definition: 'Provide a way to throw errors',
};

const createAbortStatementTool = {
    id: 'Abort',
    name: 'Abort',
    cssClass: 'icon fw fw-abort',
    title: 'Abort',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createAbortStatement,
    definition: 'Can be executed after the transaction is rolled back due to any conditions',
};

const createNamespaceDeclarationStatementTool = {
    id: 'Namespace',
    name: 'Namespace',
    title: 'Namespace',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createNamespaceDeclarationStatement,
};

const createTransactionAbortedStatementTool = {
    id: 'Transaction',
    name: 'Transaction',
    cssClass: 'icon fw fw-transaction',
    title: 'Transaction',
    nodeFactoryMethod: DefaultBallerinaASTFactory.createTransactionAbortedStatement,
    definition: 'Series of data manipulation statements that must either fully complete or fully fail, leaving the system in a consistent state',
};

const statementToolDefArray = [createIfStatementTool, createAssignmentExpressionTool,
    createVariableDefinitionStatementTool, createFunctionInvocationTool, createReturnStatementTool,
    createReplyStatementTool, createWhileStatementTool, createBreakStatementTool, createTryCatchStatementTool,
    createThrowStatementTool, createWorkerInvocationStatementTool, createWorkerReplyStatementTool,
    createTransformStatementTool, createJoinStatementTool, createAbortStatementTool,
    createTransactionAbortedStatementTool, createContinueStatementTool, createNamespaceDeclarationStatementTool];

const seperator = {
    id: 'constructs_seperator',
    name: '',
    seperator: true,
};

// creating a one gourp for constructs
const constructsToolDefArray = _.union(mainToolDefArray, [seperator], statementToolDefArray);

const constructs = new ToolGroup({
    toolGroupName: 'Constructs',
    toolGroupID: 'constructs-tool-group',
    toolOrder: 'horizontal',
    toolDefinitions: constructsToolDefArray,
    gridConfig: true,
});

ToolPalette.push(constructs);
export default ToolPalette;
