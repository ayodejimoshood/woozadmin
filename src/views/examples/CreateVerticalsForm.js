import React from "react";

// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

import UploadVerticalIcons from './UploadVerticalIcons'

class CreateVerticalsForm extends React.Component {
  render() {
    return (
      <>
        <Form>
          <Row>
            <Col md="12">
              <FormGroup>
                <Input
                  id="exampleFormControlInput1"
                  placeholder="vertical name"
                  type="text"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
          <Col md="12">
              <UploadVerticalIcons />
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default CreateVerticalsForm;
