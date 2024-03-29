import { observer } from "mobx-react-lite";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";

const ActivityFilters = () => {
  const {
    activityStore: { predicate, setPredicate },
  } = useStore();

  return (
    <>
      <Menu
        vertical
        size="large"
        style={{ width: "100%", marginTop: 25 }}
      >
        <Header
          icon="filter"
          attached
          color="teal"
          content="Filters"
        ></Header>
        <Menu.Item
          content="All Activities"
          active={predicate.has("all")}
          onClick={() =>
            setPredicate("all", "true")
          }
        ></Menu.Item>
        <Menu.Item
          content="I'm going"
          active={predicate.has("isGoing")}
          onClick={() =>
            setPredicate("isGoing", "true")
          }
        ></Menu.Item>
        <Menu.Item
          content="I'm hosting"
          active={predicate.has("isHost")}
          onClick={() =>
            setPredicate("isHost", "true")
          }
        ></Menu.Item>
      </Menu>
      <Header></Header>
      <Calendar
        onChange={(date) =>
          setPredicate("startDate", date as Date)
        }
        value={
          predicate.get("startDate") || new Date()
        }
      ></Calendar>
    </>
  );
};

export default observer(ActivityFilters);
