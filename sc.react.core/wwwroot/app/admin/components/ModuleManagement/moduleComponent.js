import React, { Component } from 'react';

class Module extends Component {

    state = {
        modules: []
    }

    handleButtonClick = (id, name) => {


        let module = this.state.modules.filter(x => x.id === id);
        let { permission } = module[0]

        permission.map(p => {
            if (p.name === name) {
                p.value = !p.value
            }
        })

        module[0].permission = permission;

        const m = this.state.modules;
        let index = m.indexOf(module[0]);
        m[index] = module[0]

        this.setState({
            modules: m
        });



    }

    componentDidMount() {
        const modules = this.props.modules;
        let x = [];
        let y = [];

        const perm = modules.map(m => {
            y.push({
                name: 'View',
                allow: m.canView,
                value: m.view,
                id: m.id
            });

            y.push({
                name: 'Add',
                allow: m.canAdd,
                value: m.add,
                id: m.id
            });

            y.push({
                name: 'Edit',
                allow: m.canEdit,
                value: m.edit,
                id: m.id
            });

            y.push({
                name: 'Delete',
                allow: m.canDelete,
                value: m.delete,
                id: m.id
            });

            y.push({
                name: 'Print',
                allow: m.canPrint,
                value: m.print,
                id: m.id
            });

            y.push({
                name: 'Export',
                allow: m.canExport,
                value: m.export,
                id: m.id
            });

            y.push({
                name: 'Import',
                allow: m.canImport,
                value: m.import,
                id: m.id
            });

            y.push({
                name: 'Message',
                allow: m.canMessage,
                value: m.message,
                id: m.id
            });

        })

        const modulesName = modules.map(m => {
            x.push({
                id: m.id,
                moduleName: m.moduleName,
                moduleCode: m.moduleCode,
                
                permission: y.filter(z => z.id === m.id)
            })
        })
        this.setState({
            modules: x
        })
    }

    render() {
        this.props.m(this.state);
        const moduleVar = this.state.modules.map((module, index) =>
            <tr key={index}>
                <td>{module.moduleName}</td>
                <td>
                    {
                        module.permission.map((per, index) =>
                            (<button type="button" key={index} onClick={() => this.handleButtonClick(per.id, per.name)} className={`btn btn-${per.value ? 'success' : 'default'}`} name="view" disabled={per.allow ? false : true}>{per.name.toUpperCase()}</button>)
                        )
                    }
                </td>
            </tr>
        );
        return (
            <>{moduleVar}</>
        );
    }
}

export default Module;