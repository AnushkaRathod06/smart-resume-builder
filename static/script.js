function addEducation(){
 const area=document.getElementById("educationArea");
 const div=document.createElement("div");
 div.className="repeat-item";
 div.innerHTML=`<div class="grid two">
 <label>Course / Degree<input name="education_course[]" placeholder="Degree / Course"></label>
 <label>Institute<input name="education_institute[]" placeholder="Institute"></label>
 <label>Year<input name="education_year[]" placeholder="2026"></label>
 <label>Percentage / CGPA<input name="education_score[]" placeholder="85%"></label>
 </div>`;
 area.appendChild(div);
}
function addProject(){
 const area=document.getElementById("projectArea");
 const div=document.createElement("div");
 div.className="repeat-item project-item";
 div.innerHTML=`<div class="grid two">
 <label>Project Name<input name="project_name[]" placeholder="Project name"></label>
 <label>Technology<input name="project_tech[]" placeholder="Technologies used"></label>
 </div>
 <label>Description<textarea name="project_desc[]" rows="2" placeholder="Brief description"></textarea></label>`;
 area.appendChild(div);
}
function addExperience(){
 const area=document.getElementById("experienceArea");
 const div=document.createElement("div");
 div.className="repeat-item";
 div.innerHTML=`<div class="grid two">
 <label>Job / Internship Title<input name="exp_title[]" placeholder="Intern"></label>
 <label>Company<input name="exp_company[]" placeholder="Company"></label>
 <label>Duration<input name="exp_duration[]" placeholder="Duration"></label>
 </div>
 <label>Description<textarea name="exp_desc[]" rows="2" placeholder="Work description"></textarea></label>`;
 area.appendChild(div);
}
document.getElementById("resumeForm").addEventListener("submit", async function(e){
 e.preventDefault();
 const fd=new FormData(this);
 const data={
  name:fd.get("name")||"", title:fd.get("title")||"", email:fd.get("email")||"",
  phone:fd.get("phone")||"", location:fd.get("location")||"", linkedin:fd.get("linkedin")||"",
  objective:fd.get("objective")||"",
  skills:(fd.get("skills")||"").split(",").map(x=>x.trim()).filter(Boolean),
  languages:(fd.get("languages")||"").split(",").map(x=>x.trim()).filter(Boolean),
  achievements:(fd.get("achievements")||"").split("\n").map(x=>x.trim()).filter(Boolean),
  education:[], projects:[], experience:[]
 };
 const courses=fd.getAll("education_course[]"), institutes=fd.getAll("education_institute[]"), years=fd.getAll("education_year[]"), scores=fd.getAll("education_score[]");
 courses.forEach((x,i)=>data.education.push({course:x,institute:institutes[i]||"",year:years[i]||"",score:scores[i]||""}));
 const pn=fd.getAll("project_name[]"), pt=fd.getAll("project_tech[]"), pd=fd.getAll("project_desc[]");
 pn.forEach((x,i)=>data.projects.push({name:x,tech:pt[i]||"",description:pd[i]||""}));
 const en=fd.getAll("exp_title[]"), ec=fd.getAll("exp_company[]"), ed=fd.getAll("exp_duration[]"), ex=fd.getAll("exp_desc[]");
 en.forEach((x,i)=>data.experience.push({title:x,company:ec[i]||"",duration:ed[i]||"",description:ex[i]||""}));
 const response=await fetch("/resume",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
 document.open(); document.write(await response.text()); document.close();
});
