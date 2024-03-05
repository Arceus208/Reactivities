import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import { Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState(
    []
  );

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  return (
    <div>
      <Header
        as="h2"
        icon="users"
        content="Reactivities"
      ></Header>
      <List>
        {activities.map(
          (activity: {
            id: string;
            title: string;
          }) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          )
        )}
      </List>
    </div>
  );
}

export default App;
