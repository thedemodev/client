import { BaseModel } from '@awes-io/vue-mc'

export default class User extends BaseModel {
    defaults() {
        return {
            id: null,
            email: '',
            full_name: '',
            last_activity: '',
            status_sys: '',
            status_text: '',
            role: {},

            first_name: '',
            last_name: '',
            sex: '',
            phone: '',
            password: '',
            password_confirmation: '',
            position: '',
            role: null,
            description: '',

            profile: {}
        }
    }

    routes() {
        return {
            fetch: `/api/admin/users/{id}`,
            save: `/api/admin/users`,
            update: `/api/admin/users/{id}`,
            updateStatus: `/api/admin/users/{id}/status`,
        }
    }

    async activate() {
        await this.updateStatus(1)
        this.status = 1
        this.status_sys = 'success'
        this.status_text = 'Active'
    }

    async block() {
        await this.updateStatus(0)
        this.status = 0
        this.status_sys = 'error'
        this.status_text = 'Blocked'
    }

    updateStatus(status) {
        let method = 'POST';
        let route  = this.getRoute('updateStatus');
        let params = this.getRouteParameters();
        let url    = this.getURL(route, params);
        let data   = {status}
        
        return this.createRequest({method, url, data}).send();
    }
}