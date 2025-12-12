# Numerical PDE

## PDE 建模

给定一个铁棒，其左端温度为100度，右端温度为0度。现在对这跟铁棒上的热传导过程建模。

$$
A[q(x,t)-q(x+\Delta x,t)] \Delta t=\rho A \Delta x C [u(x,t+\Delta t)-u(x,t)]
$$

-  $A$ 是铁棒的截面积
-  $q(x,t)$ 表示铁棒上 $x$ 处，$t$ 时刻的热通量（热密度）。
-  $\rho$ 是密度，$\rho A \Delta x$ 构成了 $\Delta x$ 的质量。
-  $C$ 是比热容。
-  $u(x,t)$ 表示铁棒上 $x$ 处，$t$ 时刻的温度。

 $q$ 和 $u$ 有如下关系：

$$
q=-k\frac{\partial u}{\partial x}
$$

-  $k$ 是材料的热传导率

那么，对建模的公式两边同时除以 $A\Delta x \Delta t$ ，有：
$$
\frac{q(x,t)-q(x+\Delta x,t)}{\Delta x}
=
\frac{u(x,t+\Delta t)-u(x,t)}{\Delta t}
$$

代入 $q$ 和 $u$ 的关系，可以得到偏微分方程：

$$
\frac{\partial u}{\partial t}
=
\alpha\frac{\partial^2u}{\partial x^2}

,\quad \alpha=\frac{k}{\rho C}
$$

通常，系统存在外部热源，如增加热源项目 $f(x,t)$ 可以写为：
$$
\frac{\partial u}{\partial t}
=
\alpha\frac{\partial^2u}{\partial x^2}
+f(x,t)

,\quad \alpha=\frac{k}{\rho C}
\quad f(x,t)=\frac{Q(x,t)}{\rho C}
$$

-  $Q(x,t)$ 是单位体积内，单位时间内产生的热量。
-  $f(x,t)$ 是由于热源/汇的存在，导致的单位时间内的温度变化率。


## 数值求解（差分）
铁棒的总长度为 $L$ ，将铁棒离散为 $N$ 个小段，共有 $i$ 个点，则 $\Delta x=\frac{L}{N}$ ，第 $i$ 个点的位置为 $x_i=i\Delta x$ ;将时间划分为 $n$ 个小段，第 $n$ 个时间段为 $t^n=n\Delta t$ ，则第 $i$ 个点在第 $n$ 个时间段的温度可以表示为：

$$
U_i^n \approx u(x_i,t^n)
$$


对于关于时间的一阶导数 $\frac{\partial u}{\partial x}$ 和关于空间的二阶导数 $\frac{\partial^2u}{\partial x^2}$，可以使用不同的差分方法近似：

$$
\frac{\partial u}{\partial t}(x_i,t^n) 
\approx 
\frac{U_i^{n+1}-U_i^{n}}{\Delta t}
$$

$$
\frac{\partial^2 u}{\partial x^2}(x_i,t^n) 
\approx 
\frac{U_{i-1}^{n}-2U_i^{n}+U_{i+1}^n}{(\Delta x)^2}
$$

代入上述公式至PDE中，可以得到以下**显示欧拉格式**：
$$
U_i^{n+1}=rU_{i-1}^n+(1-2r)U_i^n + rU_{i+1}^n+\Delta t \cdot f_i^n
 \,\,, \quad r=\frac{\alpha \Delta t}{(\Delta x)^2}
$$

直观上来看，这个公示的意思是：下一时刻 $n+1$ 的温度 $u_i^{n+1}$ $=$ 当前时刻 $n$ 的温度 $u_i^n$ $+$ 当前时刻 $n$ 由于热流导致的温度变化。

> 稳定性条件: $r\le \frac{1}{2}$ ，确保数值解不发散
> > 若 $r> \frac{1}{2}$ ，则当前点温度越高，下一刻温度反而越低！


## 变分法与能量
所谓能量，是一个泛函。一个物理系统的状态（比如形状、温度）在稳定或平衡时，总是处于某种能量泛函（Energy Functional）的最小值。通过求解这个泛函的极小值，可以得到系统的平衡状态。

即：优化某个能量，就是在一个无限维的空间中寻找一个函数，使得某个积分表达式取最小值。这个最小值对应的函数就是我们要找的解。

### 能量泛函
函数是把一个数映射到另一个数，泛函是把一个函数映射到另一个数。比方说：

$$
E(u)=\int^b_a\text{描述形变的项}dx
$$

对于一个弹性体，我们有一个描述其形变的函数 $u(x)$。我们可以计算出这个形变 $u(x)$ 所储存的总弹性势能 $E[u]$。这个 $E[u]$ 就是一个能量泛函。它接受一个函数 $u(x)$ 作为输入，输出一个总能量（一个数）。

#### 拉普拉斯方程与泊松方程
考虑上述的一维热传导过程：
$$
\frac{\partial u}{\partial t}
=
\alpha\frac{\partial^2u}{\partial x^2}
+f(x,t)
$$

当系统处于稳态时，满足：
$$
\frac{\partial u}{\partial t}=0
$$

且，这里暂且设外部热源 $f(x,t)$ 仅与位置有关系，与时间无关系，即 $f(x)$ 。从而，代入上式，可以得到一个方程：
$$
-\frac{\partial^2u}{\partial x^2}=f(x)
$$

- 当 $f(x)=0$ 时，这个方程称为**拉普拉斯方程**
- 当 $f(x)\ne0$ 时，这个方程称为**泊松方程**

### 变分法与最小化能量泛函
为了能够求解这个泊松方程，我们希望通过最小化某个能量泛函 $\Pi[u]$，以等价于求解这个这个泊松方程。

假设我们找到了一个稳态解 $u(x)$，满足：
$$
-\frac{\partial^2u}{\partial x^2}=f(x)
$$

这里，我们对稳态解 $u(x)$ 进行一个微小的扰动 $\delta u(x)$ ，这个扰动称为 **变分（variation）** ：

$$
u_\epsilon(x)=u(x)+\epsilon \cdot \delta u(x)
$$

其中 $\epsilon$ 是一个非常小的数。这个 $u_{\epsilon}(x)$ 代表了真实解 $u(x)$ 附近的一个可能的温度分布。如果 $u(x)$ 是使 $\Pi[u]$ 最小的函数，那么当我们在 $u(x)$ 这一点考察 $\Pi[u_{\epsilon}]$ 时，它的导数（变分）必须为零：
$$
\left. \frac{d \Pi[u_{\epsilon}]}{d \epsilon} \right|_{\epsilon=0} = 0
$$


#### 单变量函数证明
假设我们有一个普通的函数 $f(x)$，我们要找到它取最小值的点 $x^*$。我们在 $x^*$ 附近构造一个邻域：
$$
x(\epsilon) = x^* + \epsilon \cdot \Delta x
$$

我们计算 $f(x(\epsilon))$ 关于 $\epsilon$ 的导数：
$$
\frac{d f(x(\epsilon))}{d \epsilon} = \frac{d f}{d x} \cdot \frac{d x}{d \epsilon} = f'(x(\epsilon)) \cdot \Delta x
$$

如果 $x^*$ 是极值点，那么在 $\epsilon=0$ 处，导数必须为零：
$$
\left. \frac{d f(x(\epsilon))}{d \epsilon} \right|_{\epsilon=0} = f'(x^*) \cdot \Delta x = 0
$$

### 能量泛函的构造
仍然以一维热传导过程为例，先给出它的能量泛函形式（代表系统总的“非平衡”程度）：
$$
\Pi[u] = \int_{0}^{L} \left[ \frac{1}{2} \left(\frac{d u}{d x}\right)^2 - f(x) u \right] d x
$$

能量的构造主要基于两个层面：
1. 物理学上的最小能量远离
2. 数学上的逆向推导

#### 物理上的直观构造
从物理上看，积分符号由两部分组成：
- 能量耗散： $\frac{1}{2}(\frac{du}{dx})^2$ 。$\int (\frac{d u}{d x})^2 d x$ 代表了系统为维持热流而产生的总熵生产率或耗散。系统趋向于热流梯度（即 $\frac{d^2 u}{d x^2}$）最小，即 $\frac{d^2 u}{d x^2}=0$（无源无界时）。
- 外源做功： $-f(x) u$ 。这一项代表外部作用力或能量源 $f(x)$ 在场量 $u$ 上做的功。

#### 数学公式上的逆向推导
在数学上，如果一个微分方程满足某些条件，我们可以逆向构造出它的能量泛函，这个过程称为寻找欧拉-拉格朗日方程（Euler-Lagrange Equation）的逆过程。

**欧拉-拉格朗日方程**： 变分法的核心公式是，任何泛函 $\Pi[u] = \int_{a}^{b} L(x, u, u') \, d x$ 的极值函数 $u(x)$ 必须满足：
$$
\frac{\partial L}{\partial u} - \frac{d}{d x} \left( \frac{\partial L}{\partial u'} \right) = 0
$$

-  $L$ 被称为拉格朗日函数。

所以我们希望找到一个 $L$ ，使得上面的公式恰好等于泊松方程：
$$
\frac{\partial L}{\partial u} - \frac{d}{d x} \left( \frac{\partial L}{\partial u'} \right) = -\frac{d^2 u}{d x^2} - f(x) = 0
$$

观察 PDE：它包含 $u$ 的零阶项（$f(x)$）和二阶导数项（$-\frac{d^2 u}{d x^2}$）。

 $\frac{\partial L}{\partial u}$ 对应 $-f(x)$ ：
$$
\frac{\partial L}{\partial u} = -f(x)
$$

 $\frac{d}{d x} \left( \frac{\partial L}{\partial u'} \right)$ 对应 $-\frac{d^2 u}{d x^2}$ ：

$$
-\frac{d}{d x} \left( \frac{\partial L}{\partial u'} \right) = -\frac{d^2 u}{d x^2}
$$

将上述两项结合，可以得到拉格朗日函数 $L$ ：
$$
L(x, u, u') = \frac{1}{2} \left(\frac{d u}{d x}\right)^2 - f(x) u
$$

对 $L$ 积分，可以得到最终的能量泛函：
$$
\Pi[u] = \int_{0}^{L} L \, d x = \int_{0}^{L} \left[ \frac{1}{2} \left(\frac{d u}{d x}\right)^2 - f(x) u \right] d x
$$