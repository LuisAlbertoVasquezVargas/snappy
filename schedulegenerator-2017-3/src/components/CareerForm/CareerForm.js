import React, { Component } from "react";
import { Checkbox, DropdownButton, MenuItem, Button } from "react-bootstrap";
import coursesNamesByCareer from "../../processedData/2017_2/parsedCourseNamesByCareer";

let semesterTitle = [
	"1er CICLO",
	"2do CICLO",
	"3er CICLO",
	"4to CICLO",
	"5to CICLO",
	"6to CICLO",
	"7mo CICLO",
	"8vo CICLO",
	"9no CICLO",
	"10mo CICLO",
	"ELECTIVOS"
];
let careerNames = ["Ingeniería Industrial", "Ingeniería de Sistemas"];
//TODO(luisvasquez) : obtain numCourses from processed data.
const numCourses = 135;
class CareerForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: Array(numCourses).fill(0),
			career: 0
		};
		this.onClick = this.onClick.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}
	onClick(event) {
		let newChecked = JSON.parse(JSON.stringify(this.state.checked));
		newChecked[event.target.id] ^= 1; //flip 0(unchecked) to 1(checked) and viceversa.
		this.setState({
			checked: newChecked
		});
	}
	handleSelect(eventKey) {
		this.setState({
			checked: Array(numCourses).fill(0),
			career: eventKey
		});
	}
	componentWillMount() {
		//For each career we are moving elective courses that are at the beginning to
		//the end.
		for (let career = 0; career < 2; career++) {
			coursesNamesByCareer[career].push(
				JSON.parse(JSON.stringify(coursesNamesByCareer[career][0]))
			);
			coursesNamesByCareer[career].splice(0, 1);
			//Sorting courses by name.
			coursesNamesByCareer[career].forEach(semester => {
				semester.sort((courseA, courseB) => {
					return courseA.name.localeCompare(courseB.name, "es");
				});
			});
		}
	}
	render() {
		if (this.props.activated) return null;
		return (
			<div style={{ padding: 20 }}>
				{<h1>Snappy : Olvidate de generar tus horarios manualmente.</h1>}
				{<h2>Selecciona tu carrera</h2>}
				<DropdownButton
					bsSize="large"
					title={careerNames[this.state.career]}
					onSelect={this.handleSelect}
					id="dropdown-size-large"
				>
					<MenuItem eventKey={0}>Ingeniería Industrial</MenuItem>
					<MenuItem eventKey={1}>Ingeniería de Sistemas</MenuItem>
				</DropdownButton>
				{coursesNamesByCareer[this.state.career].map((semester, index) => (
					<div key={Math.random()}>
						<div>
							<h3 style={{ paddingLeft: 15, fontWeight: "Bold" }}>
								{semesterTitle[index]}
							</h3>
						</div>
						<div
							key={Math.random()}
							style={{
								display: "flex",
								flexWrap: "wrap"
							}}
						>
							{semester.map(courseEntry => (
								<div
									key={Math.random()}
									style={{
										paddingRight: 15,
										paddingTop: 5
									}}
								>
									<Checkbox
										bsClass="btn btn-secondary btn-lg active"
										className={
											this.state.checked[courseEntry.id] ? (
												"btn-danger"
											) : (
												"btn-secondary"
											)
										}
										title={courseEntry.code}
										checked={this.state.checked[courseEntry.id] ? true : false}
										onChange={this.onClick}
										id={courseEntry.id}
									>
										<span>{courseEntry.name}</span>
									</Checkbox>
								</div>
							))}
						</div>
					</div>
				))}
				<Button
					bsStyle="primary"
					bsSize="large"
					block
					style={{ padding: 10 }}
					onClick={() =>
						this.props.activateTimetables(
							JSON.parse(JSON.stringify(this.state.checked))
						)}
				>
					Generar!
				</Button>
			</div>
		);
	}
}

export default CareerForm;
