import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { addToHistory } from "@/lib/userData";
const AdvancedSearch = () => {

  const router = useRouter();
  const [, setSearchHistory] = useAtom(searchHistoryAtom);
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function submitForm(data) {
    let queryString = data.searchBy + "=true";
    if (data.geoLocation) {
      queryString += "&geoLocation=" + data.geoLocation;
    }
    if (data.medium) {
      queryString += "&medium=" + data.medium;
    }
    queryString += "&isOnView=" + data.isOnView;
    queryString += "&isHighlight=" + data.isHighlight;
    queryString += "&q=" + data.q;

    router.push("/artwork?" + queryString);
    // setSearchHistory(current => [...current, queryString]);
    setSearchHistory(await addToHistory(queryString))
  };

  return (
    <div>
      <h1>Advanced Search</h1>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control type="text" placeholder="" name="q" required {...register("q", { required: true })} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select name="searchBy" className="mb-3"{...register("searchBy")}>
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control type="text" placeholder="" name="geoLocation"{...register("geoLocation")}  />
              <Form.Text className="text-muted">
                Case Sensitive String (ie "Europe", "France", "Paris", "China", "New York", etc.), with multiple values separated by the | operator        </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control type="text" placeholder="" name="medium" {...register("medium")}/>
              <Form.Text className="text-muted">
                Case Sensitive String (ie: "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc.), with multiple values separated by the | operator        </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Highlighted"
              name="isHighlight"
              {...register("isHighlight")}
            />
            <Form.Check
              type="checkbox"
              label="Currently on View"
              name="isOnView"
              {...register("isOnView")}
            />
          </Col>
        </Row>


        <Row>
          <Col>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AdvancedSearch;
