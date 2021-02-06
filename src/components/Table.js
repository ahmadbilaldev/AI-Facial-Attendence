import React from 'react';
import { Link } from 'react-router-dom';
import { TableData, TableInfo } from './TableData.js';

function Table() {
	return (
		<>
			<div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard rounded">
				<table class="min-w-full">
					<thead>
						<tr>
							<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-base font-bold leading-4 text-purple=800 tracking-wider">
								ID
							</th>
							<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-base font-bold leading-4 text-purple=800 tracking-wider">
								Course
							</th>
							<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-base font-bold leading-4 text-purple=800 tracking-wider">
								No. of Students
							</th>
							<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-base font-bold leading-4 text-purple=800 tracking-wider">
								Status
							</th>
							<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-base font-bold leading-4 text-purple=800 tracking-wider">
								Created At
							</th>
							<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-base font-bold leading-4 text-purple=800 tracking-wider">
								Attendence
							</th>
						</tr>
					</thead>
					<tbody class="bg-white">
						<tr>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
								<div class="flex items-center">
									<div>
										<div class="text-sm leading-5 text-gray-800">#1</div>
									</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
								<div class="text-sm leading-5 text-blue-900">CS-311 Artificial Intelligence</div>
							</td>
							<td class="px-6 text-center py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
								44
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
								{TableInfo.active}
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
								12 Sept, 2020
							</td>
							<td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
								<button class="px-6 py-2 border-purple-800 border text-purple-800 rounded transition duration-300 hover:bg-purple-800 hover:text-white focus:outline-none">
									{TableInfo.attendence}
								</button>
							</td>
						</tr>
						<tr>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
								<div class="flex items-center">
									<div>
										<div class="text-sm leading-5 text-gray-800">#1</div>
									</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
								<div class="text-sm leading-5 text-blue-900">CS-311 Artificial Intelligence</div>
							</td>
							<td class="px-6 text-center py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
								44
							</td>

							<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
								{TableInfo.active}
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
								September 12
							</td>
							<td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
								<button class="px-6 py-2 border-purple-800 border text-purple-800 rounded transition duration-300 hover:bg-purple-800 hover:text-white focus:outline-none">
									{TableInfo.attendence}
								</button>
							</td>
						</tr>
						<tr>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
								<div class="flex items-center">
									<div>
										<div class="text-sm leading-5 text-gray-800">#1</div>
									</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
								<div class="text-sm leading-5 text-blue-900">CS-311 Artificial Intelligence</div>
							</td>
							<td class="px-6 text-center py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
								44
							</td>

							<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
								{TableInfo.active}
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
								September 12
							</td>
							<td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
								<button class="px-6 py-2 border-purple-800 border text-purple-800 rounded transition duration-300 hover:bg-purple-800 hover:text-white focus:outline-none">
									{TableInfo.attendence}
								</button>
							</td>
						</tr>
						<tr>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
								<div class="flex items-center">
									<div>
										<div class="text-sm leading-5 text-gray-800">#1</div>
									</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
								<div class="text-sm leading-5 text-blue-900">CS-311 Artificial Intelligence</div>
							</td>
							<td class="px-6 text-center py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
								44
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
								{TableInfo.active}
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
								September 12
							</td>
							<td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
								<button class="px-6 py-2 border-purple-800 border text-purple-800 rounded transition duration-300 hover:bg-purple-800 hover:text-white focus:outline-none">
									{TableInfo.attendence}
								</button>
							</td>
						</tr>
						<tr>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
								<div class="flex items-center">
									<div>
										<div class="text-sm leading-5 text-gray-800">#1</div>
									</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
								<div class="text-sm leading-5 text-blue-900">CS-311 Artificial Intelligence</div>
							</td>
							<td class="px-6 text-center py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
								44
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
								{TableInfo.active}
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
								September 12
							</td>
							<td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
								<button class="px-6 py-2 border-purple-800 border text-purple-800 rounded transition duration-300 hover:bg-purple-800 hover:text-white focus:outline-none">
									{TableInfo.attendence}
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}

export default Table;
