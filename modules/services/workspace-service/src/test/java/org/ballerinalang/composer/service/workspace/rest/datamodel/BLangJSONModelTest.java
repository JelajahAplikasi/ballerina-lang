/*
*  Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
*  WSO2 Inc. licenses this file to you under the Apache License,
*  Version 2.0 (the "License"); you may not use this file except
*  in compliance with the License.
*  You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing,
*  software distributed under the License is distributed on an
*  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
*  KIND, either express or implied.  See the License for the
*  specific language governing permissions and limitations
*  under the License.
*/

package org.ballerinalang.composer.service.workspace.rest.datamodel;

import com.google.gson.JsonObject;
import org.apache.commons.io.IOUtils;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import org.wso2.msf4j.MicroservicesRunner;
import org.wso2.msf4j.formparam.util.StreamUtil;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Scanner;
import javax.ws.rs.HttpMethod;

public class BLangJSONModelTest {

    private MicroservicesRunner microservicesRunner;
    //private HashMap<String, Package> packages = new HashMap<String, Package>();
    private String exptdStrFunc = "{\"root\":[{\"type\":\"package\",\"package_name\":\"test.samples\"}," +
            "{\"type\":\"service_definition\",\"service_name\":\"HelloService\",\"line_number\":\"3\"," +
            "\"annotations\":[],\"children\":[{\"type\":\"resource_definition\",\"resource_name\":\"tweet\"," +
            "\"line_number\":\"7\",\"annotations\":[{\"type\":\"annotation\",\"annotation_name\":\"GET\"," +
            "\"annotation_value\":null,\"line_number\":\"5\",\"children\":[]},{\"type\":\"annotation\"," +
            "\"annotation_name\":\"Path\",\"annotation_value\":\"/tweet\",\"line_number\":\"6\"," +
            "\"children\":[]}],\"children\":[{\"type\":\"argument_declaration\",\"parameter_name\":\"m\"," +
            "\"parameter_type\":\"message\",\"line_number\":\"7\",\"children\":[]},{\"type\":\"reply_statement\"," +
            "\"line_number\":\"8\",\"expression\":\"m\",\"children\":[{\"line_number\":\"8\"," +
            "\"type\":\"variable_reference_name\",\"variable_reference_name\":\"m\"}]}]}]}," +
            "{\"type\":\"function_definition\",\"function_name\":\"test\",\"is_public_function\":false," +
            "\"line_number\":\"13\",\"annotations\":[],\"children\":[{\"type\":\"argument_declaration\"," +
            "\"parameter_name\":\"a\",\"parameter_type\":\"int\",\"line_number\":\"13\",\"children\":[]}," +
            "{\"type\":\"return_type\",\"children\":[{\"type\":\"return_argument\",\"parameter_type\":\"int\"," +
            "\"line_number\":\"13\"}]},{\"type\":\"return_statement\",\"line_number\":\"14\"," +
            "\"children\":[{\"line_number\":\"14\",\"type\":\"add_expression\",\"children\":[{\"line_number\":\"14\"," +
            "\"type\":\"variable_reference_name\",\"variable_reference_name\":\"a\"}," +
            "{\"type\":\"basic_literal_expression\"," + "\"basic_literal_type\":\"int\"," +
            "\"basic_literal_value\":\"2\",\"line_number\":\"14\"}]}]}]}]}";

    public static void main(String[] args) {
        try {
            BLangJSONModelTest test = new BLangJSONModelTest();
            test.setup();
            test.testBLangJSONModelService();
        } catch (Exception ex) {
            //Ignore
        }
    }

    @BeforeClass
    public void setup() throws Exception {
        microservicesRunner = new MicroservicesRunner(9091);
        microservicesRunner.deploy(new BLangFileRestService()).start();
        //HTTPConnector connector = new HTTPConnector();
        //String connectorName = connector.getSymbolName().getName();
        //SymbolName symbolName = SymbolUtils.getSymNameWithParams(CONNECTOR_NAME, connector.getParameters());
        //Symbol symbol = new Symbol(connector, LangModelUtils.getTypesOfParams(connector.getParameters()));
        //GlobalScopeHolder.getInstance().insert(new SymbolName(connectorName), symbol);
        //addNativeFunction(GlobalScopeHolder.getInstance().getScope(), new SetHeader());
        //addNativeFunction(GlobalScopeHolder.getInstance().getScope(), new GetHeader());
        //addNativeFunction(GlobalScopeHolder.getInstance().getScope(), new GetQueryParam());
        //addNativeFunction(GlobalScopeHolder.getInstance().getScope(), new GetJsonPayload());
        //addNativeFunction(GlobalScopeHolder.getInstance().getScope(), new GetInt());
        //addNativeFunction(GlobalScopeHolder.getInstance().getScope(), new StringValueOf());
        //addNativeFunction(GlobalScopeHolder.getInstance().getScope(), new PrintlnString());
        //addNativeFunction(GlobalScopeHolder.getInstance().getScope(), new SetStringPayload());
        //addNativeFunction(GlobalScopeHolder.getInstance().getScope(), new ConvertToResponse());
        //addNativeFunction(GlobalScopeHolder.getInstance().getScope(), new SetJsonPayload());
        //addNativeFunction(GlobalScopeHolder.getInstance().getScope(), new GetString());
        //registerNativeAction(new Get());
        //registerNativeAction(new Post());
    }

    /*
    public static void addNativeFunction(SymScope symScope, AbstractNativeFunction function) {
        SymbolName symbolName = LangModelUtils.getSymNameWithParams(function.getPackageName() + ":" +
                function.getClass().getAnnotation(BallerinaFunction.class).functionName(), function.getParameters());
        Symbol symbol = new Symbol(function,
                LangModelUtils.getTypesOfParams(function.getParameters()), function.getReturnTypes());
        symScope.insert(symbolName, symbol);
    }

    public void registerNativeAction(AbstractNativeAction action) {
        Package aPackage = packages
                .computeIfAbsent(action.getPackageName(), k -> new Package(action.getPackagePath()));
        aPackage.getActions().put(action.getName(), action);

        String actionName = action.getSymbolName().getName();
        SymbolName symbolName = LangModelUtils.getSymNameWithParams(actionName, action.getParameters());
        Symbol symbol = new Symbol(action, LangModelUtils.getTypesOfParams(action.getParameters()),
                action.getReturnTypes());

        GlobalScopeHolder.getInstance().insert(symbolName, symbol);

    } */

    @Test
    public void testBLangJSONModelService() throws IOException, URISyntaxException {
        File file = new File(getClass().getClassLoader().getResource("samples/service/ServiceSample.bal")
                .getFile());
        HttpURLConnection urlConn = request("/ballerina/model?location=" + file.getPath(), HttpMethod.GET);
        InputStream inputStream = urlConn.getInputStream();
        String response = StreamUtil.asString(inputStream);
        Assert.assertEquals(response, exptdStrFunc);
        IOUtils.closeQuietly(inputStream);
        urlConn.disconnect();
    }

    @Test
    public void testBLangJSONModelServiceUsingPost() throws IOException, URISyntaxException {
        File file = new File(getClass().getClassLoader().getResource("samples/service/ServiceSample.bal")
                .getFile());
        HttpURLConnection urlConn = request("/ballerina/model/content", HttpMethod.POST);
        urlConn.setRequestProperty("Content-Type", "application/json");
        OutputStream outputStream = urlConn.getOutputStream();
        String content = new Scanner(file).useDelimiter("\\Z").next();;
        JsonObject json = new JsonObject();
        json.addProperty("content", content);
        outputStream.write(json.toString().getBytes());
        outputStream.flush();
        InputStream inputStream = urlConn.getInputStream();
        String response = StreamUtil.asString(inputStream);
        Assert.assertEquals(response, exptdStrFunc);
        IOUtils.closeQuietly(inputStream);
        urlConn.disconnect();
    }

    /*
    @Test
    public void testBLangJSONModelServiceUsingPost2() throws IOException, URISyntaxException {
        File file = new File(getClass().getClassLoader().getResource("samples/service/ServiceSample.bal")
                .getFile());
        ANTLRInputStream antlrInputStream = new ANTLRInputStream(new FileInputStream(file));
        BallerinaLexer ballerinaLexer = new BallerinaLexer(antlrInputStream);
        CommonTokenStream ballerinaToken = new CommonTokenStream(ballerinaLexer);

        BallerinaParser ballerinaParser = new BallerinaParser(ballerinaToken);

        BLangModelBuilder modelBuilder = new BLangModelBuilder();
        BLangAntlr4Listener langModelBuilder = new BLangAntlr4Listener(modelBuilder);

        ballerinaParser.addParseListener(langModelBuilder);
        ballerinaParser.compilationUnit();

        BallerinaFile bFile = modelBuilder.build();

        SymScope globalScope = GlobalScopeHolder.getInstance().getScope();
        SemanticAnalyzer semanticAnalyzer = new SemanticAnalyzer(bFile, globalScope);
        bFile.accept(semanticAnalyzer);

        JsonObject response = new JsonObject();
        BLangJSONModelBuilder jsonModelBuilder = new BLangJSONModelBuilder(response);
        bFile.accept(jsonModelBuilder);

    } */

    @AfterClass
    public void teardown() throws Exception {
        microservicesRunner.stop();
    }

    private HttpURLConnection request(String path, String method) throws IOException, URISyntaxException {
        URI baseURI = new URI("http://localhost:9091");
        URL url = baseURI.resolve(path).toURL();
        HttpURLConnection urlConn = (HttpURLConnection) url.openConnection();
        if (method.equals(HttpMethod.POST) || method.equals(HttpMethod.PUT)) {
            urlConn.setDoOutput(true);
        }
        urlConn.setRequestMethod(method);
        return urlConn;
    }

}
