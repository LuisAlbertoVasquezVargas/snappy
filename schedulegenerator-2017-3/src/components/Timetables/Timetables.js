import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import LOCALE from "rc-pagination/es/locale/es_ES";

const createTable = (labels, contentsMatrix) => {
	return (
		<div key={Math.random()}>
			<Table striped bordered condensed hover>
				<thead>
					<tr>
						{labels.map(cell =>
							<th
								key={Math.random()}
								style={{
									textAlign: "center",
									fontWeight: "Bold",
									fontSize: 16
								}}
							>
								{cell}
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{contentsMatrix.map(row =>
						<tr key={Math.random()}>
							{row.map(cell =>
								<td
									key={Math.random()}
									style={{
										backgroundColor: cell.color,
										textAlign: "center",
										fontWeight: "Bold",
										fontSize: 16
									}}
								>
									{cell.value}
								</td>
							)}
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
};
const createSingleTextBox = (description, content) => {
	return (
		<div
			key={Math.random()}
			style={{
				textAlign: "center",
				fontWeight: "Bold",
				fontSize: 16
			}}
		>
			{description} : {content}
		</div>
	);
};
const generateSingleTimetable = timetableEntry => {
	return (
		<div>
			<div>
				{createTable(
					["", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"],
					timetableEntry.weeklyBoard
				)}
			</div>

			<div
				style={{
					padding: 30
				}}
			>
				{[
					createSingleTextBox("Creditos", timetableEntry.numCredits),
					createSingleTextBox("Total de cursos", timetableEntry.numCourses),
					createSingleTextBox(
						"Número de soluciones",
						timetableEntry.numSolutions
					),
					createSingleTextBox(
						"Soluciones presentadas",
						timetableEntry.numPresented
					),
					createSingleTextBox(
						"Tiempo de ejecución",
						(timetableEntry.executionTime)+" ms"
					)
				]}
			</div>
			<div>
				{createTable(
					["CURSO-SECCIÓN", "NOMBRE DEL CURSO", "DOCENTE(S)"],
					timetableEntry.detail
				)}
			</div>
		</div>
	);
};
//TODO(luisvasquez):To handle courses crossings.
class Timetables extends Component {
	constructor(props) {
		super(props);
		this.state = { current: 1 };
	}
	onChange = page => {
		this.setState({
			current: page
		});
	};
	render() {
		if(!this.props.activated)return null;
		return (
			<div
				style={{
					flex: 1,
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					padding: 20
				}}
			>
				{generateSingleTimetable(this.props.timetables[this.state.current - 1])}
				<div
					style={{
						paddingLeft: 200,
						fontWeight: "bold",
						fontSize: 28
					}}
				>
					{/*TODO(luisvasquez):To create own native Pagination Component*/}
					<Pagination
						onChange={this.onChange}
						current={this.state.current}
						total={this.props.timetables.length}
						defaultPageSize={1}
						simple
						locale={LOCALE}
					/>
				</div>
			</div>
		);
	}
}

export default Timetables;
