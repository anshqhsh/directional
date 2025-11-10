import{r as p,j as c}from"./index-DJwDln9w.js";import{g as d,c as t,E as g,e as x}from"./chart-colors-BOevQg0J.js";function u({data:r}){const y=p.useMemo(()=>{if(!r||r.length===0)return{title:{text:"데이터가 없습니다"},xAxis:{type:"category",data:[]},yAxis:{type:"value"},series:[]};const o=d(),a=[...r].sort((e,i)=>e.week.localeCompare(i.week));return{tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter:e=>{if(!e||e.length===0)return"";const i=e[0].name;let n=0,s=`
              <div style="font-weight: 600; color: #374151; margin-bottom: 4px;">${i}</div>
          `;return e.forEach(l=>{n+=l.value,s+=`
              <div style="color: #6b7280; margin-bottom: 2px;">
                <span style="display: inline-block; width: 10px; height: 10px; background: ${l.color}; margin-right: 6px; border-radius: 2px;"></span>
                ${l.seriesName}: ${l.value}%
              </div>
            `}),s+=`
            <div style="margin-top: 4px; padding-top: 4px; border-top: 1px solid #e5e7eb; font-weight: 600; color: #374151;">
              총합: ${n}%
            </div>
          </div>
          `,s},backgroundColor:"white",borderColor:"transparent",textStyle:{color:"transparent"}},legend:{show:!0,data:["행복","피곤","스트레스"],top:"5%",left:"center",textStyle:{color:t["gray-700"],fontSize:12},itemWidth:14,itemHeight:14},grid:{left:"5%",right:"5%",bottom:"5%",top:"15%",containLabel:!0},xAxis:{type:"category",data:a.map(e=>e.week),axisLabel:{color:t["gray-500"],rotate:45,interval:0},axisLine:{lineStyle:{color:t["gray-200"]}}},yAxis:{type:"value",name:"백분율 (%)",nameTextStyle:{color:t["gray-500"]},min:0,max:100,axisLabel:{color:t["gray-500"],formatter:"{value}%"},axisLine:{lineStyle:{color:t["gray-200"]}},splitLine:{lineStyle:{color:t["gray-200"],opacity:.3}}},series:[{name:"행복",type:"bar",stack:"total",data:a.map(e=>e.happy),itemStyle:{color:o[1]}},{name:"피곤",type:"bar",stack:"total",data:a.map(e=>e.tired),itemStyle:{color:o[2]}},{name:"스트레스",type:"bar",stack:"total",data:a.map(e=>e.stressed),itemStyle:{color:o[3]}}],color:o}},[r]);return c.jsx("div",{className:"w-full h-full",children:c.jsx(g,{echarts:x,option:y,style:{height:"100%",width:"100%"},notMerge:!0,lazyUpdate:!0})})}function b({data:r}){const y=p.useMemo(()=>{if(!r||r.length===0)return{title:{text:"데이터가 없습니다"},xAxis:{type:"category",data:[]},yAxis:{type:"value"},series:[]};const o=d(),a=[...r].sort((e,i)=>e.week.localeCompare(i.week));return{tooltip:{trigger:"axis",axisPointer:{type:"cross"},formatter:e=>{if(!e||e.length===0)return"";const i=e[0].name;let n=0,s=`
            
              <div style="font-weight: 600; color: #374151; margin-bottom: 4px;">${i}</div>
          `;return e.forEach(l=>{n+=l.value,s+=`
              <div style="color: #6b7280; margin-bottom: 2px;">
                <span style="display: inline-block; width: 10px; height: 10px; background: ${l.color}; margin-right: 6px; border-radius: 2px;"></span>
                ${l.seriesName}: ${l.value}%
              </div>
            `}),s+=`
            <div style="margin-top: 4px; padding-top: 4px; border-top: 1px solid #e5e7eb; font-weight: 600; color: #374151;">
              총합: ${n}%
            </div>
          
          `,s},backgroundColor:"white",borderColor:"transparent",textStyle:{color:"transparent"}},legend:{show:!0,data:["행복","피곤","스트레스"],top:"5%",left:"center",textStyle:{color:t["gray-700"],fontSize:12},itemWidth:14,itemHeight:14},grid:{left:"5%",right:"5%",bottom:"5%",top:"15%",containLabel:!0},xAxis:{type:"category",boundaryGap:!1,data:a.map(e=>e.week),axisLabel:{color:t["gray-500"],rotate:45,interval:0},axisLine:{lineStyle:{color:t["gray-200"]}}},yAxis:{type:"value",name:"백분율 (%)",nameTextStyle:{color:t["gray-500"]},min:0,max:100,axisLabel:{color:t["gray-500"],formatter:"{value}%"},axisLine:{lineStyle:{color:t["gray-200"]}},splitLine:{lineStyle:{color:t["gray-200"],opacity:.3}}},series:[{name:"행복",type:"line",stack:"total",areaStyle:{},data:a.map(e=>e.happy),lineStyle:{color:o[1]},itemStyle:{color:o[1]},emphasis:{focus:"series"}},{name:"피곤",type:"line",stack:"total",areaStyle:{},data:a.map(e=>e.tired),lineStyle:{color:o[2]},itemStyle:{color:o[2]},emphasis:{focus:"series"}},{name:"스트레스",type:"line",stack:"total",areaStyle:{},data:a.map(e=>e.stressed),lineStyle:{color:o[3]},itemStyle:{color:o[3]},emphasis:{focus:"series"}}],color:o}},[r]);return c.jsx("div",{className:"w-full h-full",children:c.jsx(g,{echarts:x,option:y,style:{height:"100%",width:"100%"},notMerge:!0,lazyUpdate:!0})})}export{b as MoodTrendStackAreaChart,u as MoodTrendStackBarChart};
