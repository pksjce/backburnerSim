//Has hard dependency on Backburner


function BackburnerSim(queuenames, options){
	this.backburner = new backburner.Backburner(queuenames, options);
	this.containerElement = options["element"] || 'container';
	this.queuenames = queuenames;
	this.init = function(){
		if(this.queuenames.length <=0){
			alert('no queues specified. I cant draw');
		}
		var html = [];
		var i =0;
		for(;i<this.queuenames.length;i++){
			var name = this.queuenames[i];
			html.push('<div style="float:left;margin-right:10px;border:1px solid black;padding:10px" id=' + name + '>');
			html.push('<div id="qBox">' + name +'</div>');
			html.push('<div id="qFunc"><ul></ul></div>');
			html.push('</div>');
		}
		var elem = document.getElementById(options["element"] || 'container');
		elem.innerHTML = html.join('');
	}();
};

BackburnerSim.prototype = {
	updateDiagram:function(){
		this.currentInstance = this.backburner.currentInstance || this.currentInstance;
		var queues = this.currentInstance.queues;//[queueName]._queue;			
		for(var key in queues){
			var i = 1;
			var queueName = key;
			var elem = document.getElementById(queueName);
			var ul = elem.childNodes[1].childNodes[0];
			ul.innerHTML = "";
			var queue = queues[key]._queue;
			for(;i<queue.length;i+=4){
				var func = queue[i];
				var li = document.createElement('li');
				ul.appendChild(li);
				li.innerHTML = func.toString();
			}
		}
	
	},
	begin:function(){		
		this.backburner.begin();
		this.updateDiagram();
	},
	end:function(){		
		this.backburner.end();
		this.updateDiagram();
	},
	run:function(target, method /*, args */){		
		this.backburner.run(target, method);
		var i=0;
		for(;i<this.queuenames.length;i++){
			var queueName = this.queuenames[i];
			this.updateDiagram();
		}
		
	},
	schedule:function(queueName, target, method){		
		this.backburner.schedule(queueName, target, method);
		this.updateDiagram();
		
	},
	scheduleOnce:function(queueName, target, method){		
		this.backburner.scheduleOnce(queueName, target, method);
		this.updateDiagram();
	},
	later:function(method, time){
		this.backburner.later(method, time);
		this.updateDiagram();
	},
	throttle:function(){

	},
	debounce:function(){

	},
	cancelTimers:function(){

	},
	cancel:function(){

	}
};

window.BackburnerSim = BackburnerSim;

