import Loading from "./loading.vue";
import createLoadingLikeDirective from "../../../utils/create-loading-like-directive";

const loadingDirective = createLoadingLikeDirective(Loading);

export default loadingDirective;
