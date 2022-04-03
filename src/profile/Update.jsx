import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


import { accountService, alertService } from '@/_services';

function Update({ history }) {
    const user = accountService.userValue;
    const [pasState, setPasState] = useState(false)
    const [myRole, setMyRole] = useState(user.role)
    const initialValues = {
        color: user.color,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
        confirmPassword: ''
    };

    const itemsFromBackend = [
        { id: '1', content: "Admin" },
        { id: '2', content: "Editor" },
        { id: '3', content: "Writer" },
        { id: '4', content: "User" },
    ];

    const columnsFromBackend = {
        ['1']: {
            name: "Roles",
            items: itemsFromBackend.filter(i => i.content != myRole)
        },
        ['2']: {
            name: "My role",
            items: itemsFromBackend.filter(i => i.content == myRole)
        },
    };

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId && destination.droppableId != 1 ) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = []
            sourceItems.push(destColumn.items[0])
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setMyRole(removed.content)
            console.log(destination.droppableId);
            setColumns({
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        }
    };

    const [columns, setColumns] = useState(columnsFromBackend);

    const validationSchema = Yup.object().shape({
        // color: Yup.string()
        //     .required('Title is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password) return schema.required('Confirm Password is required');
            })
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        fields = { ...fields, role: myRole }
        accountService.update(fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    const [isDeleting, setIsDeleting] = useState(false);
    function onDelete() {
        if (confirm('Are you sure?')) {
            setIsDeleting(true);
            accountService.delete(user.id)
                .then(() => alertService.success('Account deleted successfully'));
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h1>Update Profile</h1>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Theme</label>
                            <Field name="color" as="select" className={'form-control' + (errors.color && touched.color ? ' is-invalid' : '')}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Field>
                            <ErrorMessage name="color" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-5">
                            <label>First Name</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-5">
                            <label>Last Name</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    {/* <DragDropContext
                        //  onDragEnd={(e) => { setMyRole(e.draggableId); }}
                         >
                            <div className='drag-from'>
                                <Droppable isDragDisabled droppableId="some_id">
                                    {provided => (
                                        <>
                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                {roles.filter(i=> i != myRole).map((item,index) =>
                                                    <Draggable onDragEnd={(e) => {
                                                        console.log(e);
                                                    }} draggableId={item} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                                {item}
                                                            </div>
                                                        )}
                                                    </Draggable>)}
                                            </div>
                                            {provided.placeholder}
                                        </>
                                    )}
                                </Droppable>
                            </div>
                            <Droppable droppableId="some_id">
                                    {provided => (
                                        <>
                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                <Draggable isDragDisabled draggableId={'target'} index={-1}>
                                                    {(provided, snapshot) => (
                                                        <div  className='role-target' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            {myRole}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            </div>
                                            {provided.placeholder}
                                        </>
                                    )}
                                </Droppable>
                        </DragDropContext> */}
                    <div className='drag-container'>
                        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                            {Object.entries(columns).map(([columnId, column], index) => {
                                return (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center"
                                        }}
                                        key={columnId}>
                                        <h4>{column.name}</h4>
                                        <div style={{ margin: 8 }}>
                                            <Droppable droppableId={columnId} key={columnId}>
                                                {(provided, snapshot) => {
                                                    return (
                                                        <div
                                                            className='drop-box'
                                                            {...provided.droppableProps}
                                                            ref={provided.innerRef}
                                                            style={{
                                                                background: snapshot.isDraggingOver
                                                                    ? "lightblue"
                                                                    : "lightgrey",
                                                                padding: 4,
                                                            }}
                                                        >
                                                            {column.items.map((item, index) => {
                                                                return (
                                                                    <Draggable
                                                                    isDragDisabled={columnId === 1 ? true : false }
                                                                        key={item.id}
                                                                        draggableId={item.id}
                                                                        index={index}
                                                                    >
                                                                        {(provided, snapshot) => {
                                                                            return (
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    className="drop-item"
                                                                                    style={{
                                                                                        userSelect: "none",
                                                                                        backgroundColor: snapshot.isDragging
                                                                                            ? "#343a40"
                                                                                            : "#307bff",
                                                                                        color: "white",
                                                                                        ...provided.draggableProps.style
                                                                                    }}
                                                                                >
                                                                                    {item.content}
                                                                                </div>
                                                                            );
                                                                        }}
                                                                    </Draggable>
                                                                );
                                                            })}
                                                            {provided.placeholder}
                                                        </div>
                                                    );
                                                }}
                                            </Droppable>
                                        </div>
                                    </div>
                                );
                            })}
                        </DragDropContext>
                    </div>

                    <div onClick={() => { setPasState(!pasState) }} className='row form-row check-box-row'>
                        <input type={'checkbox'} checked={pasState} />
                        <h6 className="pt-3">Change Password</h6>
                    </div>
                    {pasState ? <>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col">
                                <label>Confirm Password</label>
                                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                    </> : null}
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Update
                        </button>
                        <div>
                        </div>
                        {/* <button type="button" onClick={() => onDelete()} className="btn btn-danger" style={{ width: '75px' }} disabled={isDeleting}>
                            {isDeleting
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Delete</span>
                            }
                        </button> */}
                        <Link to="." className="btn btn-link">Cancel</Link>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export { Update };