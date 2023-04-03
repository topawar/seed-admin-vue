import container from "../../views/Container/Index.vue";

const systemRouter = [
    {
        path: "system",
        component: container,
        redirect: "/system/page",
        name: "system",
        children: [
            {
                path: "article",
                name: "article",
                component: () => import("../../views/System/articleSystem/Index.vue")
            }
        ]
    }
]

export default systemRouter