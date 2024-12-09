
const API_ENDPOINTS = {
    // App routes
    SIGNUP_API: '/auth/register',
    LOGIN_API: '/auth/login',
    APP_USER_DETAILS_API: (userId:string) => `/auth/${userId}`,
    APP_FORGOT_PASSWORD_API: '/auth/forget-password',
    APP_RESET_PASSWORD_API: '/auth/reset-password',

    // app endpoints

    // employees api

    // notifications endpoint
    SAVE_NOTIFICATION_API: '/notification',
    GET_NOTIFICATION_API: (id:string) => `/notification/${id}`,
    MARK_READ_NOTIFICAITONS_API: (id:string) => `/notification/${id}/emp-read`,

    CREATE_ORDER_API: '/orders',
    GET_ALL_ORDERS_API: '/orders',
    UPDATE_ORDER_STATUS_API: (orderId:string) => `/orders/${orderId}/status`,
    GET_ORDERS_BY_USER_ID: (userId:string) => `/orders/user/${userId}`,
    GET_ACTIVE_ORDERS: `/orders/active`,


    // admin api routes

    // menu endpoints
    ADMIN_ADD_MENU_API: '/app/menus/create-menu',
    ADMIN_UPDATE_MENU_API: (menuId:string) => `/app/menus/${menuId}`,
    ADMIN_GET_ALL_MENUS_API: '/app/menus',
    ADMIN_GET_MENUS_BY_CATEGORY_ID_API: (categoryId:string) => `/app/menus/${categoryId}/category`,
    ADMIN_GET_MENU_BY_ID_API: (menuId:string) => `/app/menus/${menuId}`,
    ADMIN_DELETE_MENU_BY_ID_API: (menuId:string) => `/app/menus/${menuId}`,

    ADMIN_ADD_CATEGORY_API: '/admin/categories',
    ADMIN_UPDATE_CATEGORY_API: (categoryId:string) => `/admin/categories/${categoryId}`,
    ADMIN_GET_ALL_CATEGORYS_API: '/admin/categories',
    ADMIN_GET_CATEGORY_BY_ID_API: (categoryId:string) => `/admin/categories/${categoryId}`,
    ADMIN_DELETE_CATEGORY_BY_ID_API: (categoryId:string) => `/admin/categories/${categoryId}`,


    // agents endpoints
    CREATE_DELIVERY_AGENT_API: '/delivery-agents',
    UPDATE_DELIVERY_AGENT_LOCATION_API: (agentId:string) => `/delivery-agents/${agentId}/update-location`,
    ASSIGN_ORDER_TO_DELIVERY_AGENT_API: (agentId:string) => `/delivery-agents/${agentId}/assign-order`,
    GET_ALL_DELIVERY_AGENTS_API: `/delivery-agents`,
    GET_AGENT_BY_ORDER_ID_API: (orderId:string) => `/delivery-agents/${orderId}/order`, 
    GET_AGENT_BY_AGENT_ID_API: (agentId:string) => `/delivery-agents/${agentId}/agent`, 

    // feedback endpoints
    ADD_FEEDBACK_API: '/feedback',
    GET_ALL_FEEDBACK_API: '/feedback',
    GET_FEEDBACK_BY_ORDER_ID_API: (orderId:string) => `/feedback/order/${orderId}`,
    GET_FEEDBACK_BY_USER_ID_API: (userId:string) => `/feedback/user/${userId}`,



    
}

export default API_ENDPOINTS