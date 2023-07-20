import useAppData from './useAppData';
export default  function useProfile() {
    const {username, avatar} = useAppData();
    return {username, avatar};
}
