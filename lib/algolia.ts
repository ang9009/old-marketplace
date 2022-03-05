import algoliasearch from "algoliasearch";

const algolia = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID, process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY);

export default algolia;