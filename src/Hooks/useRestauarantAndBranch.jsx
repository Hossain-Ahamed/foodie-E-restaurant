import  { useContext } from 'react'
import { BranchAndRestaurantNameContext } from '../Contexts/BranchAndRestaurantNameProvider/BranchAndRestaurantNameProvider';

const useRestauarantAndBranch = () => {
  const data = useContext(BranchAndRestaurantNameContext);

  return data;
}

export default useRestauarantAndBranch
