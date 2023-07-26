import useAppData from './useAppData';
export default  function useProfile() {
    const {data} = useAppData();
    const {username, avatar} = data;
    return {username, avatar};
}
