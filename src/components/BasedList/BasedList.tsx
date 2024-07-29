import { useQuery } from "@tanstack/react-query";
import { getBasedList } from "../../api/camping";

const BasedList = () => {
  const { data } = useQuery({
    queryKey: ["based-list"],
    queryFn: getBasedList,
  });

  console.log("data :", data);

  return <div>basedlist</div>;
};

export default BasedList;
