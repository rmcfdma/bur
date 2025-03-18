import { Engine, Render, Runner, Bodies, Composite, Constraint, Body } from 'matter-js'

export class PenduloDuplo {
    // propriedades da renderizaçãp
    private engine: Engine
    private render: Render
    private runner: Runner
    private pivot: { x: number, y: number }
    private esfera1: Body
    private esfera2: Body
    private restricao1: Constraint
    private restricao2: Constraint
    private referencial: Body;
    private trajectory: { x: number, y: number }[] = []
    // Condições Iniciais
    private theta: number = Math.PI/2
    private phi: number = Math.PI/2
    private omega_theta: number = 0
    private omega_phi: number = 0
    private dt: number = 0.1
    private g: number = 9.81
    private L1: number
    private L2: number
    private R1: number
    private R2: number
    private m1: number
    private m2: number
    // Vetor de Estados y = [theta, phi, omega_theta, omega_phi]
    private edo = (y: number[], t: number): number[] => [
        y[2],
        y[3],
        (-this.g * (2 * this.m1 + this.m2) * Math.sin(y[0]) - this.m2 * this.g * (y[0] - 2 * y[1]) - 2 * Math.sin(y[0] - y[1]) * this.m2 * (Math.pow(y[3], 2) * this.L2 + Math.pow(y[2], 2) * this.L1 * Math.cos(y[0] - y[1]))) / (this.L1 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * y[0] - 2 * y[1]))),
        (2 * Math.sin(y[0] - y[1]) * (Math.pow(y[2], 2) * this.L1 * (this.m1 + this.m2) + this.g * (this.m1 + this.m2) * Math.cos(y[0]) + Math.pow(y[3], 2) * this.L2 * this.m2 * Math.cos(y[0] - y[1]))) / (this.L2 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * y[0] - 2 * y[1])))
    ]

    constructor(canvas: HTMLCanvasElement, pivot: { x: number, y: number }, L1: number, L2: number, R1: number, R2: number, m1: number, m2: number) {
        this.engine = Engine.create()
        this.render = Render.create({
            canvas: canvas,
            engine: this.engine,
            options: {
                width: canvas.width,
                height: canvas.height,
                wireframes: false,
                background: 'white'
            }
        })

        this.pivot = pivot
        this.L1 = L1
        this.L2 = L2
        this.R1 = R1
        this.R2 = R2
        this.m1 = m1
        this.m2 = m2

        this.esfera1 = Bodies.circle(this.pivot.x, this.pivot.y + this.L1, this.R1, {
            inertia: Infinity,
            render: {
                fillStyle: 'black'
            }
        })

        this.esfera2 = Bodies.circle(this.pivot.x, this.pivot.y + this.L2, this.R2, {
            inertia: Infinity,
            render: {
                fillStyle: 'black'
            }
        })

        this.restricao1 = Constraint.create({
            pointA: this.pivot,
            bodyB: this.esfera1,
            pointB: { x: 0, y: 0 },
            stiffness: 1,
            length: this.L1,
            render: {
                strokeStyle: 'black',
                lineWidth: 1.5
            }
        })

        this.restricao2 = Constraint.create({
            bodyA: this.esfera1,
            pointA: { x: 0, y: 0 },
            bodyB: this.esfera2,
            pointB: { x: 0, y: 0 },
            stiffness: 1,
            length: this.L2,
            render: {
                strokeStyle: 'black',
                lineWidth: 1.5
            }
        })

        // Criação do retângulo fino horizontal como referencial inercial
        this.referencial = Bodies.rectangle(canvas.width / 2, 20, canvas.width, 5, {
            isStatic: true,
            render: {
                fillStyle: 'red'
            }
        });


        Composite.add(this.engine.world, [this.referencial, this.esfera1, this.restricao1, this.esfera2, this.restricao2,])

        this.runner = Runner.create()
    }

    private rk4 = (f: (y: number[], t: number) => number[], y0: number[], t0: number, h: number): number[] => {
        const k1 = f(y0, t0)
        const k2 = f(y0.map((yi, i) => yi + 0.5 * h * k1[i]), t0 + 0.5 * h)
        const k3 = f(y0.map((yi, i) => yi + 0.5 * h * k2[i]), t0 + 0.5 * h)
        const k4 = f(y0.map((yi, i) => yi + h * k3[i]), t0 + h)
        return y0.map((yi, i) => yi + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]))
    }

    private rk5 = (f: (y: number[], t: number) => number[], y0: number[], t0: number, h: number): number[] => {
        const k1 = f(y0, t0);
        const k2 = f(y0.map((yi, i) => yi + 0.25 * h * k1[i]), t0 + 0.25 * h);
        const k3 = f(y0.map((yi, i) => yi + (3 / 32) * h * k1[i] + (9 / 32) * h * k2[i]), t0 + (3 / 8) * h);
        const k4 = f(y0.map((yi, i) => yi + (1932 / 2197) * h * k1[i] - (7200 / 2197) * h * k2[i] + (7296 / 2197) * h * k3[i]), t0 + (12 / 13) * h);
        const k5 = f(y0.map((yi, i) => yi + (439 / 216) * h * k1[i] - 8 * h * k2[i] + (3680 / 513) * h * k3[i] - (845 / 4104) * h * k4[i]), t0 + h);
        const k6 = f(y0.map((yi, i) => yi - (8 / 27) * h * k1[i] + 2 * h * k2[i] - (3544 / 2565) * h * k3[i] + (1859 / 4104) * h * k4[i] - (11 / 40) * h * k5[i]), t0 + 0.5 * h);
        return y0.map((yi, i) => yi + (h / 6) * (16 / 135 * k1[i] + 6656 / 12825 * k3[i] + 28561 / 56430 * k4[i] - 9 / 50 * k5[i] + 2 / 55 * k6[i]));
    };


    public start() {
        Engine.run(this.engine)
        Render.run(this.render)
        Runner.run(this.runner, this.engine)
        this.update()
    }

    private radToDeg(radianos: number): number {
        return radianos * (180 / Math.PI);
    }

    private calcularEnergiaCinetica(omega: number): number {
        return 0.5 * this.m1 * Math.pow(omega * this.L1 / 100, 2);
    }

    private calcularEnergiaPotencial(theta: number): number {
        return this.m1 * this.g * (this.L1 / 100 * (1 - Math.cos(theta)));
    }

    private calcularEnergiaMecanica(theta: number, omega: number): number {
        return this.calcularEnergiaCinetica(omega) + this.calcularEnergiaPotencial(theta);
    }

    private update = () => {
        [this.theta, this.phi, this.omega_theta, this.omega_phi] = this.rk4(this.edo, [this.theta, this.phi, this.omega_theta, this.omega_phi], 0, this.dt)

        Body.setPosition(this.esfera1, { x: this.pivot.x + this.L1 * Math.sin(this.theta), y: this.pivot.y + this.L1 * Math.cos(this.theta) })
        Body.setPosition(this.esfera2, { x: this.pivot.x + this.L1 * Math.sin(this.theta) + this.L2 * Math.sin(this.phi), y: this.pivot.y + this.L1 * Math.cos(this.theta) + this.L2 * Math.cos(this.phi) })

        const context = this.render.context;
        context.clearRect(0, 0, this.render.canvas.width, this.render.canvas.height);
        Render.world(this.render);

        // Desenhar os valores de theta e omega no canvas
        context.font = '20px Arial';
        context.fillStyle = 'black';
        context.fillText(`θ: ${this.radToDeg(this.theta).toFixed(2)}°`, 10, 30);
        context.fillText(`ω: ${this.radToDeg(this.omega_theta).toFixed(2)}°`, 10, 60)

        // Calcular e desenhar as energias
        const energiaCinetica = this.calcularEnergiaCinetica(this.omega_theta);
        const energiaPotencial = this.calcularEnergiaPotencial(this.theta);
        const energiaMecanica = this.calcularEnergiaMecanica(this.theta, this.omega_theta);

        context.fillText(`Ec: ${this.calcularEnergiaCinetica(this.omega_theta).toFixed(2)} J`, 10, 90);
        context.fillText(`Ep: ${this.calcularEnergiaPotencial(this.theta).toFixed(2)} J`, 10, 120);
        context.fillText(`Em: ${this.calcularEnergiaMecanica(this.theta, this.omega_theta).toFixed(2)} J`, 10, 150);


        // this.trajectory.push({ x: this.esfera.position.x, y: this.esfera.position.y })

        // const context = this.render.context
        // context.clearRect(0, 0, this.render.canvas.width, this.render.canvas.height)
        // Render.world(this.render)
        // context.beginPath()
        // for (let i = 0; i < this.trajectory.length - 1; i++) {
        //     context.moveTo(this.trajectory[i].x, this.trajectory[i].y)
        //     context.lineTo(this.trajectory[i + 1].x, this.trajectory[i + 1].y)
        // }
        // context.strokeStyle = 'red'
        // context.lineWidth = 2
        // context.stroke()

        requestAnimationFrame(this.update)
    }
}
