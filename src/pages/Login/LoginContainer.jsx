import React from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import Login from "./Login";
import SignUp from "./SingUp";

export default function LoginContainer() {
  const [selected, setSelected] = React.useState("login");

  return (
    <div className=" w-screen h-screen  flex flex-col  mt-5 md:mt-8 lg:mt-10 xl:mt-16 ">
      <Card className="mx-auto ">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <Login />
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <SignUp/>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
